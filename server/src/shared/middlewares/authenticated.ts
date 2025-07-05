import { Response, Request, NextFunction } from 'express';
import JWTToken from '../utils/jwtToken';
import { UnauthorizedError } from '../errors';

const authenticated = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Unauthorized Request - No token provided');
  }

  try {
    const decoded = JWTToken.verifyToken(token);

    if (!decoded) {
      throw new UnauthorizedError('Unauthorized Request - Invalid token');
    }

    req.user = decoded;
  } catch (error) {
    next(new UnauthorizedError('Unauthorized Request - Invalid token'));
    return;
  }

  next();
};

export default authenticated;
