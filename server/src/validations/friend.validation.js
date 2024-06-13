import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const friends = {
  params: Joi.object().keys({
    selectedUserId: Joi.string().custom(mongoId),
  }),
};

export default {
  friends,
};
