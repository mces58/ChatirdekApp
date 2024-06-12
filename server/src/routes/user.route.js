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
import authentication from 'src/middlewares/authentication.middleware';

const router = Router();

router.get('/', authentication, getUsers);

router.post('/last-messages/', getLastMessagesWithOtherUsers);

router.get('/:userId', authentication, getUserById);

router.post('/friend-request', authentication, sendFriendRequest);

router.get('/friend-request/:userId', authentication, getByIdFriendRequest);

router.post('/friend-request/accept', authentication, sendAcceptFriendRequest);

router.get('/accepted-friends/:userId', authentication, getByIdAcceptFriendRequest);

router.get('/non-friends/:userId', authentication, getNonFriends);

router.delete('/remove-friend/:userId/:friendId', authentication, removeFriend);

export default router;
