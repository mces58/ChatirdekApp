import { Router } from 'express';

import { getMessages, sendMessage } from 'src/controllers/message.controller';
import protectRoute from 'src/middlewares/protectRoute.middleware';

const router = Router();

router.post('/send/:id', protectRoute, sendMessage);

router.get('/:id', protectRoute, getMessages);

export default router;
