import { Router } from 'express';

import {
  getByIdAcceptFriendRequest,
  getByIdFriendRequest,
  getLastMessagesWithOtherUsers,
  getNonFriends,
  getUserById,
  getUsers,
  removeFriend,
  sendAcceptFriendRequest,
  sendFriendRequest,
} from 'src/controllers/user.controller';
import protectRoute from 'src/middlewares/protectRoute.middleware';

const router = Router();

router.get('/', protectRoute, getUsers);

router.post('/last-messages/', getLastMessagesWithOtherUsers);

router.get('/:userId', protectRoute, getUserById);

router.post('/friend-request', protectRoute, sendFriendRequest);

router.get('/friend-request/:userId', protectRoute, getByIdFriendRequest);

router.post('/friend-request/accept', protectRoute, sendAcceptFriendRequest);

router.get('/accepted-friends/:userId', protectRoute, getByIdAcceptFriendRequest);

router.get('/non-friends/:userId', protectRoute, getNonFriends);

router.delete('/remove-friend/:userId/:friendId', protectRoute, removeFriend);

export default router;
