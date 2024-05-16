import { Router } from 'express';

import { getLastMessagesWithOtherUsers, getUsers } from 'src/controllers/user.controller';
import protectRoute from 'src/middlewares/protectRoute.middleware';

const router = Router();

router.get('/', protectRoute, getUsers);

router.get('/last-messages', protectRoute, getLastMessagesWithOtherUsers);

export default router;
