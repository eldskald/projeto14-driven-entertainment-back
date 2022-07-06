import { Router } from 'express';
import { login, signup } from '../controllers/authController.js';
import createToken from '../middlewares/createToken.js';
import loginValidation from '../middlewares/loginValidation.js';
import signupValidation from '../middlewares/signupValidation.js';

const router = Router();
router.post('/login', loginValidation, createToken, login);
router.post('/signup', signupValidation, signup);
export default router;
