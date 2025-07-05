import { injectable } from 'tsyringe';
import AuthRepository from './auth.repository';
import { CreateUserDto } from './auth.types';
import { BadRequestError, NotFoundError } from '../../shared/errors';
import bcrypt from 'bcrypt';
import JWTToken from '../../shared/utils/jwtToken';

@injectable()
class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register = async (data: CreateUserDto) => {
    const { email, password } = data;

    const existingUser = await this.authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestError('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  };

  login = async (data: Pick<CreateUserDto, 'email' | 'password'>) => {
    const { email, password } = data;

    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError('Invalid email or password.');
    }

    if (!user.password) {
      throw new NotFoundError('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) {
      throw new NotFoundError('Invalid email or password.');
    }

    const token = await JWTToken.generateToken({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    });

    return { user, token };
  };
}

export default AuthService;
