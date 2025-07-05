import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import AuthService from './auth.service';
import { UserLoginInput, UserRegisterInput } from './auth.schema';
import { success } from '../../shared/utils/httpResponse';

@injectable()
class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request<{}, {}, UserRegisterInput['body']>,
    res: Response,
  ) => {
    const data = req.body;
    const user = await this.authService.register(data);

    success(res, { user }, 201);
    return;
  };

  login = async (
    req: Request<{}, {}, UserLoginInput['body']>,
    res: Response,
  ) => {
    const data = req.body;
    const user = await this.authService.login(data);

    success(res, { ...user }, 200);
    return;
  };
}

export default AuthController;
