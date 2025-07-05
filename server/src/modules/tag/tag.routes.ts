import { Router } from 'express';
import AsyncWrapper from '../../shared/middlewares/asyncWrapper';
import TagController from './tag.controller';
import container from '../../core/container';
import authenticated from '../../shared/middlewares/authenticated';

const router = Router();

const tagController = container.resolve(TagController);

router.get('/', authenticated, AsyncWrapper(tagController.getTags));
router.get('/:id', authenticated, AsyncWrapper(tagController.getTag));
router.post('/', authenticated, AsyncWrapper(tagController.createTag));
router.put('/:id', authenticated, AsyncWrapper(tagController.updateTag));
router.delete('/:id', authenticated, AsyncWrapper(tagController.deleteTag));

export default router;
