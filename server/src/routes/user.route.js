import { Router } from 'express';

import {
  getLastMessagesWithOtherUsers,
  getUserById,
  getUsers,
} from 'src/controllers/user.controller';
import protectRoute from 'src/middlewares/protectRoute.middleware';

const router = Router();

router.get('/', protectRoute, getUsers);

router.post('/last-messages/', getLastMessagesWithOtherUsers);

router.get('/:userId', protectRoute, getUserById);

export default router;
