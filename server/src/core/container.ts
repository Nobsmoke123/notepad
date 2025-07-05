import { container } from 'tsyringe';
import prisma from '../infra/client';
import AuthRepository from '../modules/auth/auth.repository';
import AuthService from '../modules/auth/auth.service';
import AuthController from '../modules/auth/auth.controller';

container.registerInstance('PrismaExtendedClient', prisma);

container.register<AuthRepository>(AuthRepository, {
  useClass: AuthRepository,
});

container.register<AuthService>(AuthService, {
  useClass: AuthService,
});

container.register<AuthController>(AuthController, {
  useClass: AuthController,
});

export default container;
