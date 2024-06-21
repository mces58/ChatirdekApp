import { Router } from 'express';

import {
  getLastMessages,
  sendAudioMessage,
  sendImageMessage,
} from 'src/controllers/message.controller';
import authentication from 'src/middlewares/authentication.middleware';
import validate from 'src/middlewares/validate.middleware';
import messageValidation from 'src/validations/message.validation';

const router = Router();

// @route   GET /api/messages/last-messages
// @desc    Get the last messages of the logged in user
// @access  Private
router.route('/last-messages').get(authentication, getLastMessages);

// @route   POST /api/messages/send/image/:selectedUserId
// @desc    Send an image to a specific user
// @access  Private
router
  .route('/send/image/:selectedUserId')
  .post(validate(messageValidation.sendImageMessage), authentication, sendImageMessage);

// @route   POST /api/messages/send/audio/:selectedUserId
// @desc    Send an audio to a specific user
// @access  Private
router
  .route('/send/audio/:selectedUserId')
  .post(validate(messageValidation.sendImageMessage), authentication, sendAudioMessage);

export default router;
