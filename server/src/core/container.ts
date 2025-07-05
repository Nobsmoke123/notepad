import { container } from 'tsyringe';
import prisma from '../infra/client';
import AuthRepository from '../modules/auth/auth.repository';
import AuthService from '../modules/auth/auth.service';
import AuthController from '../modules/auth/auth.controller';
import TagRepository from '../modules/tag/tag.repository';
import TagService from '../modules/tag/tag.service';
import TagController from '../modules/tag/tag.controller';

container.registerInstance('PrismaExtendedClient', prisma);

// Auth DI
container.register<AuthRepository>(AuthRepository, {
  useClass: AuthRepository,
});
container.register<AuthService>(AuthService, {
  useClass: AuthService,
});
container.register<AuthController>(AuthController, {
  useClass: AuthController,
});

// Tag DI
container.register<TagRepository>(TagRepository, {
  useClass: TagRepository,
});
container.register<TagService>(TagService, {
  useClass: TagService,
});
container.register<TagController>(TagController, {
  useClass: TagController,
});

export default container;
