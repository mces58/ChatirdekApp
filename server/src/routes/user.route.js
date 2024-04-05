import { Router } from 'express';

import userGet from '../controllers/user.controller';

const router = Router();

router.get('/', userGet);

export default router;
