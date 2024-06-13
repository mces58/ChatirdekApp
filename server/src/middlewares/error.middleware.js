import httpStatus from 'http-status';
import Joi from 'joi';

import dotEnvConfig from 'src/configs/dotEnv.config';
import APIError from 'src/utils/apiError';
import logger from 'src/utils/logger.util';

const converter = (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    const errorMessage = err.details.map((d) => ({
      message: d.message,
      location: d.path[1],
      locationType: d.path[0],
    }));
    const apiError = new APIError(errorMessage, httpStatus.BAD_REQUEST);
    apiError.stack = err.stack;
    return next(apiError);
  }
  if (!(err instanceof APIError)) {
    const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[status];
    const apiError = new APIError(message, status, false);
    apiError.stack = err.stack;
    apiError.message = [{ message: err.message }];
    return next(apiError);
  }
  err.message = [{ message: err.message }];
  return next(err);
};

const notFound = (req, res, next) =>
  next(new APIError(httpStatus[httpStatus.NOT_FOUND], httpStatus.NOT_FOUND));

const handler = (err, req, res) => {
  let { status, message } = err;
  if (dotEnvConfig.ENV === 'production' && !err.isOperational) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  logger.error(err.stack);
  return res.status(status).json({
    status,
    errors: message,
    ...(dotEnvConfig.ENV === 'development' && { stack: err.stack }),
  });
};

export default {
  converter,
  notFound,
  handler,
};
