import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const getGroupMessages = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
};

const sendGroupMessage = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
  body: Joi.object().keys({
    message: Joi.string().trim().required().label('Group Message'),
  }),
};

export default {
  getGroupMessages,
  sendGroupMessage,
};
