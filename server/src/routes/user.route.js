import { Router } from 'express';

import getUsers from 'src/controllers/user.controller';
import protectRoute from 'src/middlewares/protectRoute.middleware';

const router = Router();

router.get('/', protectRoute, getUsers);

export default router;
