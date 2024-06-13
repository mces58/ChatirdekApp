import jwt from 'jsonwebtoken';

import dotEnvConfig from 'src/configs/dotEnv.config';

const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign({ _id: user._id }, dotEnvConfig.JWT.SECRET, {
    expiresIn: '15d',
  });

  res.cookie('token', token, {
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: 'strict',
    secure: dotEnvConfig.ENV !== 'development',
  });

  return token;
};

export default generateTokenAndSetCookie;
