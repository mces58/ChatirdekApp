import dotEnvConfig from 'src/configs/dotEnv.config';

const mailConfig = {
  service: dotEnvConfig.SMTP.SERVICE,
  host: dotEnvConfig.SMTP.HOST,
  port: dotEnvConfig.SMTP.PORT,
  secure: dotEnvConfig.SMTP.SECURE,
  auth: {
    user: dotEnvConfig.SMTP.EMAIL,
    pass: dotEnvConfig.SMTP.PASSWORD,
  },
};

export default mailConfig;
