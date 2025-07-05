import { Router } from 'express';
import container from '../../core/container';
import NoteController from './note.controller';

const router = Router();
const noteController = container.resolve(NoteController);

export default router;
