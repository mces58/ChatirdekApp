import bcrypt from 'bcryptjs';

import User from 'src/models/user.model';
import { encode } from 'src/utils/bcryptjs.util';
import generateTokenAndSetCookie from 'src/utils/generateToken.util';
import sendMail from 'src/utils/sendMail.util';

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = await User.findOne({ userName }).exec();

    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const profilePicture = `https://avatar.iran.liara.run/public/${
      gender === 'male' ? 'boy' : 'girl'
    }?username=${userName}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture,
    });

    if (user) {
      await user.save();
      generateTokenAndSetCookie(res, user);
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePicture: user.profilePicture,
      });
    }
    return res.status(500).json({ message: 'Failed to create user' });
  } catch (error) {
    console.error('signup error:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ userName }).select('+password').exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = generateTokenAndSetCookie(res, user);
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePicture: user.profilePicture,
        token,
        createdAt: user.createdAt,
      });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('logout error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, userName } = req.body;
    if (!userName) return next(new Error('Please enter email'));

    const user = await User.findOne({ userName });
    if (!user) return next(new Error('User not found'));

    try {
      const code = await sendMail(email);

      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        code,
      });
    } catch (error) {
      return next(new Error('Email could not be sent'));
    }

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    const hashedPassword = await encode(password);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

export const me = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).exec();

    if (user) {
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('me error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
