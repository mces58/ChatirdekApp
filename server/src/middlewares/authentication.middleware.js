import jwt from 'jsonwebtoken';

import dotEnvConfig from 'src/configs/dotEnv.config';
import User from 'src/models/user.model';

const authentication = async (req, res, next) => {
  const { token } = req.cookies || '';

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, dotEnvConfig.JWT.SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default authentication;
