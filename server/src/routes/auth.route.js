import { Router } from 'express';
import { check } from 'express-validator';

import {
  forgotPassword,
  login,
  logout,
  me,
  register,
  resetPassword,
} from 'src/controllers/auth.controller';
import authentication from 'src/middlewares/authentication.middleware';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router
  .route('/register')
  .post(
    [
      check('fullName', 'Full name is required').not().isEmpty(),
      check('userName', 'Username is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
      check('confirmPassword', 'Passwords do not match').custom(
        (value, { req }) => value === req.body.password
      ),
      check('gender', 'Gender is required').isIn(['male', 'female']),
    ],
    register
  );

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router
  .route('/login')
  .post(
    [
      check('userName', 'Username is required').not().isEmpty(),
      check('password', 'Password is required').not().isEmpty(),
    ],
    login
  );

// @route   GET /api/auth/logout
// @desc    Logout user
// @access  Private
router.route('/logout').get(authentication, logout);

// @route   POST /api/auth/password/forgot
// @desc    Forgot password
// @access  Public
router
  .route('/password/forgot')
  .post([check('userName', 'Username is required').not().isEmpty()], forgotPassword);

// @route   PUT /api/auth/password/reset
// @desc    Reset password
// @access  Public
router
  .route('/password/reset')
  .put(
    [
      check('userName', 'Username is required').not().isEmpty(),
      check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
      check('confirmPassword', 'Passwords do not match').custom(
        (value, { req }) => value === req.body.password
      ),
    ],
    resetPassword
  );

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router
  .route('/me')
  .get(
    [
      check('id', 'User ID is required').not().isEmpty(),
      check('id', 'User ID must be a valid ObjectId').isMongoId(),
    ],
    authentication,
    me
  );

export default router;
