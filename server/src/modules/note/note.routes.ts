import { Router } from 'express';
import container from '../../core/container';
import NoteController from './note.controller';
import authenticated from '../../shared/middlewares/authenticated';
import AsyncWrapper from '../../shared/middlewares/asyncWrapper';
import validateZodSchema from '../../shared/middlewares/validation';
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from './note.schema';

const router = Router();
const noteController = container.resolve(NoteController);

router.get('/', authenticated, AsyncWrapper(noteController.getNotes));

router.get(
  '/:id',
  authenticated,
  validateZodSchema(deleteNoteSchema),
  AsyncWrapper(noteController.getNote),
);

router.post(
  '/',
  authenticated,
  validateZodSchema(createNoteSchema),
  AsyncWrapper(noteController.createNote),
);

router.put(
  '/:id',
  authenticated,
  validateZodSchema(updateNoteSchema),
  AsyncWrapper(noteController.updateNote),
);

router.delete(
  '/:id',
  authenticated,
  validateZodSchema(deleteNoteSchema),
  AsyncWrapper(noteController.deleteNote),
);

export default router;
