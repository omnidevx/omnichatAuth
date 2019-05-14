import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middlewares/checkJwt';

export const authRouter = Router();

authRouter.post('/login', AuthController.login);

authRouter.post('/change-password', [checkJwt], AuthController.changePassword);

authRouter.post('/verify', AuthController.verify);
