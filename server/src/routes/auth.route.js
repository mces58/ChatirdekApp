import { Router } from 'express';

import {
  forgotPassword,
  login,
  logout,
  me,
  meUpdate,
  meUpdateAvatar,
  register,
  resetPassword,
} from 'src/controllers/auth.controller';
import authentication from 'src/middlewares/authentication.middleware';
import upload from 'src/middlewares/multer.middleware';
import validate from 'src/middlewares/validate.middleware';
import authValidation from 'src/validations/auth.validation';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.route('/register').post(validate(authValidation.register), register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.route('/login').post(validate(authValidation.login), login);

// @route   GET /api/auth/logout
// @desc    Logout user
// @access  Private
router.route('/logout').get(authentication, logout);

// @route   POST /api/auth/password/forgot
// @desc    Forgot password
// @access  Public
router
  .route('/password/forgot')
  .post(validate(authValidation.forgotPassword), forgotPassword);

// @route   PUT /api/auth/password/reset
// @desc    Reset password
// @access  Public
router
  .route('/password/reset')
  .put(validate(authValidation.resetPassword), resetPassword);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.route('/me').get(authentication, me);

// @route   PUT /api/auth/me
// @desc    Update current user
// @access  Private
router.route('/me').put(validate(authValidation.updateProfile), authentication, meUpdate);

// @route   PUT /api/auth/me/avatar
// @desc    Update current user avatar
// @access  Private
router.route('/me/avatar').put(authentication, upload.single('image'), meUpdateAvatar);

export default router;
