import jwt from 'jsonwebtoken';
import { PUBLIC_KEY, PRIVATE_KEY } from '../../core/config';

export interface ITokenPayload {
  id: string;
  email: string;
  fullname: string;
}

export default class JWTToken {
  static generateToken = (userData: ITokenPayload): string => {
    return jwt.sign(userData, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: '30000',
      issuer: 'devrail',
    });
  };

  static verifyToken = (token: string): ITokenPayload => {
    return jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
      issuer: 'devrail',
    }) as ITokenPayload;
  };
}
