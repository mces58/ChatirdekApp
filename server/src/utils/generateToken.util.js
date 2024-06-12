import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('token', token, {
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
};

export default generateTokenAndSetCookie;
