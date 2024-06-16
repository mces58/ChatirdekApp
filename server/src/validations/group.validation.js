/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const createGroup = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(50).required().label('Name'),
    members: Joi.array()
      .items(Joi.string().custom(mongoId))
      .min(1)
      .required()
      .label('Members'),
  }),
};

const updateGroup = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(50).label('Name'),
    description: Joi.string().trim().min(2).max(500).label('Description'),
  }),
};

const deleteGroup = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
};

const getGroup = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
};

const addMember = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
  body: Joi.object().keys({
    members: Joi.array()
      .items(Joi.string().custom(mongoId))
      .min(1)
      .required()
      .label('Members'),
  }),
};

const removeMember = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
    userId: Joi.custom(mongoId).label('User ID'),
  }),
};

const leaveGroup = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
};

const makeOwner = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
    userId: Joi.custom(mongoId).label('User ID'),
  }),
};

export default {
  createGroup,
  updateGroup,
  deleteGroup,
  getGroup,
  addMember,
  removeMember,
  leaveGroup,
  makeOwner,
};
