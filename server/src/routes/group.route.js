import { Router } from 'express';

import protectRoute from 'src/middlewares/protectRoute.middleware';

import * as GroupController from '../controllers/group.controller';

const router = Router();

router.post('/', protectRoute, GroupController.createGroup);

router.get('/', protectRoute, GroupController.getGroups);

router.get('/:groupId', protectRoute, GroupController.getGroup);

router.post('/:groupId/messages', protectRoute, GroupController.sendGroupMessage);

router.get('/:groupId/messages', protectRoute, GroupController.getGroupMessages);

router.post('/:groupId/members', protectRoute, GroupController.addGroupMember);

router.delete(
  '/:groupId/members/:userId',
  protectRoute,
  GroupController.removeGroupMember
);

router.delete('/:groupId/members', protectRoute, GroupController.leaveGroup);

router.get('/:groupId/members/:userId', protectRoute, GroupController.getNonGroupMembers);

export default router;
