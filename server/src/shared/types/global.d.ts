import { ITokenPayload } from '../utils/jwtToken';
export {};

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
