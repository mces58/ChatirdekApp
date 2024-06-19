/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

const register = {
  body: Joi.object().keys({
    fullName: Joi.string().trim().min(2).max(50).required().label('Full Name'),
    userName: Joi.string().alphanum().min(2).max(30).required().label('Username'),
    email: Joi.string().trim().email().required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .label('Confirm Password'),
    gender: Joi.string().valid('male', 'female').required().label('Gender'),
  }),
};

const login = {
  body: Joi.object().keys({
    userName: Joi.string().alphanum().min(2).max(30).required().label('Username'),
    password: Joi.string().min(6).required().label('Password'),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required().label('Email'),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .label('Confirm Password'),
  }),
};

const updateProfile = {
  body: Joi.object().keys({
    fullName: Joi.string().trim().min(2).max(50).label('Full Name'),
    userName: Joi.string().alphanum().min(2).max(30).label('Username'),
    email: Joi.string().trim().email().label('Email'),
    gender: Joi.string().valid('male', 'female').label('Gender'),
    avatar: Joi.string().label('Avatar'),
    about: Joi.string().max(160).label('About'),
    hideOnlineStatus: Joi.boolean().label('Hide Online Status'),
    hideAvatar: Joi.boolean().label('Hide Avatar'),
    hideAbout: Joi.boolean().label('Hide About'),
  }),
};

const updateAvatar = {
  body: Joi.object().keys({
    uri: Joi.string().allow('', null).label('Avatar'),
  }),
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  updateAvatar,
};
