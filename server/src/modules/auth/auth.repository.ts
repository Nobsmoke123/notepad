import { inject, injectable } from 'tsyringe';
import type { PrismaExtendedClient } from '../../infra/client';
import { CreateUserDto, UpdateUserDto } from './auth.types';

@injectable()
class AuthRepository {
  constructor(
    @inject('PrismaExtendedClient')
    private readonly prisma: PrismaExtendedClient,
  ) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        fullname: data.fullname,
      },
      omit: {
        password: true, // Exclude password from the response
      },
    });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data,
      omit: {
        password: true, // Exclude password from the response
      },
    });
  }
}

export default AuthRepository;
