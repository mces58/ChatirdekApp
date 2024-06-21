import { Router } from 'express';

import {
  getGroupLastMessage,
  sendGroupAudioMessage,
  sendGroupImageMessage,
} from 'src/controllers/groupMessage.controller';
import authentication from 'src/middlewares/authentication.middleware';
import validate from 'src/middlewares/validate.middleware';
import groupMessageValidation from 'src/validations/groupMessage.validation';

const router = Router();

// @route   GET /api/group/messages/last-message
// @desc    Get group last message
// @access  Private
router.route('/last-message').get(authentication, getGroupLastMessage);

// @route   POST /api/group/messages/send/image/:groupId
// @desc    Send group image message
// @access  Private
router
  .route('/send/image/:groupId')
  .post(
    validate(groupMessageValidation.sendGroupImageMessage),
    authentication,
    sendGroupImageMessage
  );

// @route   POST /api/group/messages/send/audio/:groupId
// @desc    Send group audio message
// @access  Private
router
  .route('/send/audio/:groupId')
  .post(
    validate(groupMessageValidation.sendGroupAudioMessage),
    authentication,
    sendGroupAudioMessage
  );

export default router;
