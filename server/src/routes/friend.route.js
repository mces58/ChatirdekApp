import { Router } from 'express';

import {
  acceptFriendRequest,
  getFriends,
  getIncomingFriendRequests,
  getNonFriends,
  getOutgoingFriendRequests,
  removeFriend,
  sendFriendRequest,
} from 'src/controllers/friend.controller';
import authentication from 'src/middlewares/authentication.middleware';
import validate from 'src/middlewares/validate.middleware';
import friendValidation from 'src/validations/friend.validation';

const router = Router();

// @route   GET /api/friendship/friends
// @desc    Get friends
// @access  Private
router.route('/friends').get(authentication, getFriends);

// @route   GET /api/friendship/send/:selectedUserId
// @desc    Send friendship request
// @access  Private
router
  .route('/send/:selectedUserId')
  .get(validate(friendValidation.friends), authentication, sendFriendRequest);

// @route   GET /api/friendship/incoming-requests
// @desc    Get incoming friendship requests
// @access  Private
router.route('/incoming-requests').get(authentication, getIncomingFriendRequests);

// @route   GET /api/friendship/outgoing-requests
// @desc    Get outgoing friendship requests
// @access  Private
router.route('/outgoing-requests').get(authentication, getOutgoingFriendRequests);

// @route   GET /api/friendship/accept/:selectedUserId
// @desc    Accept friend request
// @access  Private
router
  .route('/accept/:selectedUserId')
  .get(validate(friendValidation.friends), authentication, acceptFriendRequest);

// @route   GET /api/friendship/non-friends
// @desc    Get non-friends
// @access  Private
router.route('/non-friends').get(authentication, getNonFriends);

// @route   DELETE /api/friendship/remove/:selectedUserId
// @desc    Remove friend
// @access  Private
router
  .route('/remove/:selectedUserId')
  .delete(validate(friendValidation.friends), authentication, removeFriend);

export default router;
