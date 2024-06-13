import { sign, verify } from 'jsonwebtoken';

import dotEnvConfig from 'src/configs/dotEnv.config';

const jwtSign = (id) => {
  const token = sign({ id }, dotEnvConfig.JWT.SECRET, {
    expiresIn: dotEnvConfig.JWT.EXPIRESTIME,
  });

  return token;
};

const jwtVerify = (token) => verify(token, dotEnvConfig.JWT.SECRET);

export { jwtSign, jwtVerify };
