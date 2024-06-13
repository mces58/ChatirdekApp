import { Router } from 'express';

import { getUserById, getUsers } from 'src/controllers/user.controller';
import authentication from 'src/middlewares/authentication.middleware';
import validate from 'src/middlewares/validate.middleware';
import userValidation from 'src/validations/user.validation';

const router = Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.route('/').get(authentication, getUsers);

// @route   GET /api/users/:userId
// @desc    Get user by ID
// @access  Private
router.route('/:userId').get(validate(userValidation.user), authentication, getUserById);

export default router;
