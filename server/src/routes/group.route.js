import { Router } from 'express';

import authentication from 'src/middlewares/authentication.middleware';

import * as GroupController from '../controllers/group.controller';

const router = Router();

router.post('/', authentication, GroupController.createGroup);

router.get('/', authentication, GroupController.getGroups);

router.get('/:groupId', authentication, GroupController.getGroup);

router.post('/:groupId/messages', authentication, GroupController.sendGroupMessage);

router.get('/:groupId/messages', authentication, GroupController.getGroupMessages);

router.post('/:groupId/members', authentication, GroupController.addGroupMember);

router.delete(
  '/:groupId/members/:userId',
  authentication,
  GroupController.removeGroupMember
);

router.delete('/:groupId/members', authentication, GroupController.leaveGroup);

router.get(
  '/:groupId/members/:userId',
  authentication,
  GroupController.getNonGroupMembers
);

export default router;
