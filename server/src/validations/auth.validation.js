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
    userName: Joi.string().alphanum().min(2).max(30).required().label('Username'),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    userName: Joi.string().alphanum().min(2).max(30).required().label('Username'),
    password: Joi.string().min(6).required().label('Password'),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .label('Confirm Password'),
  }),
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
};
