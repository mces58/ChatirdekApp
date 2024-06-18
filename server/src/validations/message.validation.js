import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const messages = {
  params: Joi.object().keys({
    selectedUserId: Joi.string().custom(mongoId),
  }),
};

const sendMessage = {
  params: Joi.object().keys({
    selectedUserId: Joi.string().custom(mongoId),
  }),
  body: Joi.object().keys({
    message: Joi.string().trim().required().label('Message'),
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
  sendMessage,
  sendImageMessage,
};
