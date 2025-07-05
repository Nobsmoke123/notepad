import { Router, Request, Response } from 'express';
import { error, success } from './shared/utils/httpResponse';

const router = Router();

router.get('/api/health', (_req: Request, res: Response) => {
  success(res, { status: 'ok' }, 200);
});

// Import routes for other modules

router.all('/*splat', (_req: Request, res: Response) => {
  error(res, { status: 'Route not found' }, 404);
});

export default router;
