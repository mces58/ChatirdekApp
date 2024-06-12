import { validationResult } from 'express-validator';

import User from 'src/models/user.model';
import { decode, encode } from 'src/utils/bcryptjs.util';
import handleErrors from 'src/utils/error.util';
import generateTokenAndSetCookie from 'src/utils/generateToken.util';
import sendMail from 'src/utils/sendMail.util';

export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, userName, email, password, gender } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists. Change email or userName' }] });
    }

    const avatar = `https://avatar.iran.liara.run/public/${
      gender === 'male' ? 'boy' : 'girl'
    }?username=${userName}`;

    const hashedPassword = await encode(password);

    user = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      avatar,
      gender,
    });

    if (user) {
      await user.save();
      generateTokenAndSetCookie(res, user);
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    }
    return res.status(500).json({ message: 'Failed to create user' });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await decode(password, user.password);

    if (match) {
      const token = generateTokenAndSetCookie(res, user);
      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token,
        data: user,
      });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    try {
      const code = await sendMail(user.email);
      res.status(200).json({
        success: true,
        message: `Email sent successfully: ${user.email}`,
        code,
      });
    } catch (error) {
      next(error);
    }

    return Promise.resolve();
  } catch (error) {
    next(error);
    return Promise.reject(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await encode(password);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });

    return Promise.resolve();
  } catch (error) {
    next(error);
    return Promise.reject(error);
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
