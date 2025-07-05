import { Router, Request, Response } from 'express';
import { error, success } from './shared/utils/httpResponse';
import authRouter from './modules/auth/auth.routes';
import tagRouter from './modules/tag/tag.routes';
import noteRouter from './modules/note/note.routes';

const router = Router();

router.get('/api/health', (_req: Request, res: Response) => {
  success(res, { status: 'ok' }, 200);
});

// Import routes for other modules
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/tags', tagRouter);
router.use('/api/v1/notes', noteRouter);

// Admin Route

router.all('/*splat', (_req: Request, res: Response) => {
  error(res, { status: 'Route not found' }, 404);
});

export default router;
