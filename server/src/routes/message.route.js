import { Router } from 'express';

import { getMessages, sendMessage } from 'src/controllers/message.controller';
import authentication from 'src/middlewares/authentication.middleware';

const router = Router();

router.post('/send/:id', authentication, sendMessage);

router.get('/:id', authentication, getMessages);

export default router;
