import { Router } from 'express';

import adminGet from '../controllers/admin.controller';

const router = Router();

router.get('/', adminGet);

export default router;
