import { Router } from 'express';

import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from 'src/controllers/auth.controller';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset').put(resetPassword);

export default router;
