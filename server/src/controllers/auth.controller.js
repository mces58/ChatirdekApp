import User from 'src/models/user.model';
import { decode, encode } from 'src/utils/bcryptjs.util';
import handleErrors from 'src/utils/error.util';
import generateTokenAndSetCookie from 'src/utils/generateToken.util';
import sendMail from 'src/utils/sendMail.util';

export const register = async (req, res) => {
  const { fullName, userName, email, password, gender } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists. Change email or userName' }] });
    }

    const avatar = `https://avatar.iran.liara.run/username?username=${`${fullName.split(' ')[0]}+${fullName.split(' ')[1]}`}}`;

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
        data: { user, token },
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
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    try {
      const code = await sendMail(email);
      res.status(200).json({
        success: true,
        message: `Email sent successfully: ${user.email}`,
        data: code,
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

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
    const user = await User.findById(req.user.id);
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

export const meUpdate = async (req, res) => {
  const { id } = req.user;
  const { fullName, userName, email, about, hideOnlineStatus, hideAvatar, hideAbout } =
    req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [emailExists, userNameExists] = await Promise.all([
      email && email !== user.email ? User.findOne({ email }) : null,
      userName && userName !== user.userName ? User.findOne({ userName }) : null,
    ]);

    if (emailExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
    if (userNameExists) {
      return res.status(400).json({ message: 'Username is already in use' });
    }

    Object.assign(user, {
      fullName: fullName || user.fullName,
      userName: userName || user.userName,
      email: email || user.email,
      about: about || user.about,
      hideOnlineStatus:
        hideOnlineStatus !== undefined ? hideOnlineStatus : user.hideOnlineStatus,
      hideAvatar: hideAvatar !== undefined ? hideAvatar : user.hideAvatar,
      hideAbout: hideAbout !== undefined ? hideAbout : user.hideAbout,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated',
      data: user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const meUpdateAvatar = async (req, res) => {
  const { id } = req.user;
  const { uri } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = uri;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User avatar updated',
      data: user,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
