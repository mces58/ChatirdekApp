import { Router } from 'express';

import { login, logout, signup } from 'src/controllers/auth.controller';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

export default router;
