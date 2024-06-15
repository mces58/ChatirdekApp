import { Router } from 'express';

import {
  getLastMessages,
  getMessages,
  sendImageMessage,
  sendMessage,
} from 'src/controllers/message.controller';
import authentication from 'src/middlewares/authentication.middleware';
import upload from 'src/middlewares/multer.middleware';
import validate from 'src/middlewares/validate.middleware';
import messageValidation from 'src/validations/message.validation';

const router = Router();

// @route   GET /api/messages/last-messages
// @desc    Get the last messages of the logged in user
// @access  Private
router.route('/last-messages').get(authentication, getLastMessages);

// @route   GET /api/messages/:selectedUserId
// @desc    Get messages between the logged in user and a specific user
// @access  Private
router
  .route('/:selectedUserId')
  .get(validate(messageValidation.messages), authentication, getMessages);

// @route   POST /api/messages/send/:selectedUserId
// @desc    Send a message to a specific user
// @access  Private
router
  .route('/send/:selectedUserId')
  .post(validate(messageValidation.sendMessage), authentication, sendMessage);

// @route   POST /api/messages/send/image/:selectedUserId
// @desc    Send an image to a specific user
// @access  Private
router
  .route('/send/image/:selectedUserId')
  .post(
    validate(messageValidation.messages),
    authentication,
    upload.single('image'),
    sendImageMessage
  );

export default router;
