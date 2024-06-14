import { Router } from 'express';

import {
  getGroupLastMessage,
  getGroupMessages,
  sendGroupImageMessage,
  sendGroupMessage,
} from 'src/controllers/groupMessage.controller';
import authentication from 'src/middlewares/authentication.middleware';
import upload from 'src/middlewares/multer.middleware';
import validate from 'src/middlewares/validate.middleware';
import groupMessageValidation from 'src/validations/groupMessage.validation';

const router = Router();

// @route   GET /api/group/messages/:groupId
// @desc    Get group messages
// @access  Private
router
  .route('/:groupId')
  .get(
    validate(groupMessageValidation.getGroupMessages),
    authentication,
    getGroupMessages
  );

// @route   POST /api/group/messages/send/:groupId
// @desc    Send group message
// @access  Private
router
  .route('/send/:groupId')
  .post(
    validate(groupMessageValidation.sendGroupMessage),
    authentication,
    sendGroupMessage
  );

// @route   POST /api/group/messages/send/image/:groupId
// @desc    Send group image message
// @access  Private
router
  .route('/send/image/:groupId')
  .post(
    validate(groupMessageValidation.getGroupMessages),
    authentication,
    upload.single('image'),
    sendGroupImageMessage
  );

// @route   GET /api/group/messages/:groupId/last-message
// @desc    Get group last message
// @access  Private
router
  .route('/:groupId/last-message')
  .get(validate(groupMessageValidation.getGroupLastMessage), getGroupLastMessage);

export default router;
