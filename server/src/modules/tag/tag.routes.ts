import { Router } from 'express';
import AsyncWrapper from '../../shared/middlewares/asyncWrapper';
import TagController from './tag.controller';
import container from '../../core/container';
import authenticated from '../../shared/middlewares/authenticated';
import validateZodSchema from '../../shared/middlewares/validation';
import {
  createTagSchema,
  deleteTagSchema,
  updateTagSchema,
} from './tag.schema';

const router = Router();

const tagController = container.resolve(TagController);

router.get('/', authenticated, AsyncWrapper(tagController.getTags));
router.get(
  '/:id',
  validateZodSchema(deleteTagSchema),
  authenticated,
  AsyncWrapper(tagController.getTag),
);
router.post(
  '/',
  validateZodSchema(createTagSchema),
  authenticated,
  AsyncWrapper(tagController.createTag),
);
router.put(
  '/:id',
  validateZodSchema(updateTagSchema),
  authenticated,
  AsyncWrapper(tagController.updateTag),
);
router.delete(
  '/:id',
  validateZodSchema(deleteTagSchema),
  authenticated,
  AsyncWrapper(tagController.deleteTag),
);

export default router;
