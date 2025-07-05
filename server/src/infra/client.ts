import dotenv from 'dotenv';
import { PrismaClient } from '../infra/client/';
// Uncomment the following line if you want to use the Prisma Accelerate extension
// import {PrismaClient} from '../infra/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

dotenv.config();

// const prismaInstance = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
//   errorFormat: 'pretty',
// }).$extends(withAccelerate());

const prismaInstance = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

export type PrismaExtendedClient = typeof prismaInstance;

export default prismaInstance;
