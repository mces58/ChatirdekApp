import Joi from 'joi';
import _ from 'lodash';

import logger from 'src/utils/logger.util';

const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ['params', 'query', 'body']);
  const object = _.pick(req, Object.keys(validSchema));
  const { error, value } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'path', wrap: { label: false } }, abortEarly: false })
    .validate(object);
  if (error) {
    logger.error(error);
    res.status(400).json({
      message: 'Validation Error',
      errors: error.details.map((x) => _.pick(x, ['message', 'path'])),
    });
    return;
  }
  Object.assign(req, value);
  return next();
};

export default validate;
