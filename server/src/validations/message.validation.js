import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const messages = {
  params: Joi.object().keys({
    selectedUserId: Joi.string().custom(mongoId),
  }),
};

const sendImageMessage = {
  params: Joi.object().keys({
    selectedUserId: Joi.string().custom(mongoId),
  }),
  body: Joi.object().keys({
    uri: Joi.string().trim().required().label('Image'),
  }),
};

export default {
  messages,
  sendImageMessage,
};
