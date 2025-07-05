import { ITokenPayload } from '../utils/jwtToken';

declare global {
  namespace Express {
    interface Request {
      user: ITokenPayload;
      session: {
        jwt: string;
      } | null;
    }
  }
}
