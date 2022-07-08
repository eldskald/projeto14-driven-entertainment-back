import { Router } from 'express';
import { login, signup, getSession } from '../controllers/authController.js';
import loginValidation from '../middlewares/loginValidation.js';
import signupValidation from '../middlewares/signupValidation.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/session', tokenValidation, getSession);
export default router;
