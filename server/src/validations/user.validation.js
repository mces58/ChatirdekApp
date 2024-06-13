import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const user = {
  params: Joi.object().keys({
    userId: Joi.string().custom(mongoId),
  }),
};

export default {
  user,
};
