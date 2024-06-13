import { Router } from 'express';

import {
  getGroupMessages,
  sendGroupMessage,
} from 'src/controllers/groupMessage.controller';
import authentication from 'src/middlewares/authentication.middleware';

const router = Router();

router.route('/:groupId/messages').get(authentication, getGroupMessages);

router.route('/:groupId/messages').post(authentication, sendGroupMessage);

export default router;
