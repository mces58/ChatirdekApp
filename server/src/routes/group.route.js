import { Router } from 'express';

import {
  addMember,
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  leaveGroup,
  removeMember,
  updateGroup,
} from 'src/controllers/group.controller';
import authentication from 'src/middlewares/authentication.middleware';
import validate from 'src/middlewares/validate.middleware';
import groupValidation from 'src/validations/group.validation';

const router = Router();

// @route   POST /api/groups/
// @desc    Create a group
// @access  Private
router
  .route('/')
  .post(validate(groupValidation.createGroup), authentication, createGroup);

// @route   PUT /api/groups/:groupId
// @desc    Update a group
// @access  Private
router
  .route('/:groupId')
  .put(validate(groupValidation.updateGroup), authentication, updateGroup);

router
  .route('/:groupId')
  .delete(validate(groupValidation.deleteGroup), authentication, deleteGroup);

// @route   GET /api/groups/
// @desc    Get all groups
// @access  Private
router.route('/').get(authentication, getGroups);

// @route   GET /api/groups/:groupId
// @desc    Get a group
// @access  Private
router
  .route('/:groupId')
  .get(validate(groupValidation.getGroup), authentication, getGroup);

// @route   POST /api/groups/:groupId/members
// @desc    Add member to a group
// @access  Private
router
  .route('/:groupId/members/add')
  .post(validate(groupValidation.addMember), authentication, addMember);

// @route   DELETE /api/groups/:groupId/members/remove/:userId
// @desc    Remove member from a group
// @access  Private
router
  .route('/:groupId/members/remove/:userId')
  .delete(validate(groupValidation.removeMember), authentication, removeMember);

// @route   DELETE /api/groups/:groupId/members/leave
// @desc    Leave a group
// @access  Private
router
  .route('/:groupId/members/leave')
  .delete(validate(groupValidation.leaveGroup), authentication, leaveGroup);

export default router;
