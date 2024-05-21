import { sign, verify } from 'jsonwebtoken';

const jwtSign = (id) => sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_TIME,
});

const jwtVerify = (token) => verify(token, process.env.JWT_SECRET);

export { jwtSign, jwtVerify };
