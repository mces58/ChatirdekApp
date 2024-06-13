import dotenv from 'dotenv';
import dotEnvExpand from 'dotenv-expand';
import Joi from 'joi';

dotEnvExpand.expand(dotenv.config());

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  APP_NAME: Joi.string().allow('').empty('').default('CHATIRDEK'),
  HOST: Joi.string().allow('').empty('').default('0.0.0.0'),
  PORT: Joi.number().allow('').empty('').default(5000),

  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_QUERY_STRING: Joi.string().optional(),
  DATABASE_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_TIME: Joi.string().required(),

  SMTP_HOST: Joi.string().allow('').empty('').default('smtp.gmail.com'),
  SMTP_PORT: Joi.number().allow('').empty('').default(465),
  SMTP_SERVICE: Joi.string().allow('').empty('').default('gmail'),
  SMTP_SECURE: Joi.boolean().allow('').empty('').default(true),
  SMTP_EMAIL: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),

  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config env error: ${error.message}`);
}

export default {
  ENV: envVars.NODE_ENV,
  APPNAME: envVars.APP_NAME,
  HOST: envVars.HOST,
  PORT: envVars.PORT,

  DATABASE_URI: envVars.DATABASE_URI,

  JWT: {
    SECRET: envVars.JWT_SECRET,
    EXPIRESTIME: envVars.JWT_EXPIRES_TIME,
  },

  SMTP: {
    HOST: envVars.SMTP_HOST,
    PORT: envVars.SMTP_PORT,
    SERVICE: envVars.SMTP_SERVICE,
    SECURE: envVars.SMTP_SECURE,
    EMAIL: envVars.SMTP_EMAIL,
    PASSWORD: envVars.SMTP_PASSWORD,
  },

  CLOUDINARY: {
    CLOUDNAME: envVars.CLOUDINARY_CLOUD_NAME,
    APIKEY: envVars.CLOUDINARY_API_KEY,
    APISECRET: envVars.CLOUDINARY_API_SECRET,
  },
};
