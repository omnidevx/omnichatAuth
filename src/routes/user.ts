import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

export const userRouter = Router();

userRouter.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);

userRouter.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], UserController.getOneById);

userRouter.post('/', [checkJwt, checkRole(['ADMIN'])], UserController.newUser);

userRouter.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], UserController.editUser);

userRouter.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], UserController.deleteUser);
