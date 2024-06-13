import { Router } from 'express';
import { check } from 'express-validator';

import {
  getMessages,
  sendImageMessage,
  sendMessage,
} from 'src/controllers/message.controller';
import authentication from 'src/middlewares/authentication.middleware';
import upload from 'src/middlewares/multer.middleware';

const router = Router();

// @route   GET /api/messages/:selectedUserId
// @desc    Get messages between the logged in user and a specific user
// @access  Private
router.route('/:selectedUserId').get(authentication, getMessages);

// @route   POST /api/messages/send/:selectedUserId
// @desc    Send a message to a specific user
// @access  Private
router
  .route('/send/:selectedUserId')
  .post(
    [check('message', 'Message is required').not().isEmpty()],
    authentication,
    sendMessage
  );

// @route   POST /api/messages/send/image/:selectedUserId
// @desc    Send an image to a specific user
// @access  Private
router
  .route('/send/image/:selectedUserId')
  .post(authentication, upload.single('image'), sendImageMessage);

export default router;
