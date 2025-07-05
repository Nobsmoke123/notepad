import { Router } from 'express';
import AsyncWrapper from '../../shared/middlewares/asyncWrapper';
import container from '../../core/container';
import AuthController from './auth.controller';
import validateZodSchema from '../../shared/middlewares/validation';
import { userLoginSchema, userRegisterSchema } from './auth.schema';
import authenticated from '../../shared/middlewares/authenticated';

const router = Router();

const authController = container.resolve(AuthController);

router.post(
  '/register',
  validateZodSchema(userRegisterSchema),
  AsyncWrapper(authController.register),
);

router.post(
  '/login',
  validateZodSchema(userLoginSchema),
  AsyncWrapper(authController.login),
);

router.get('/getMe', authenticated, AsyncWrapper(authController.getMe));

export default router;
