import dotenv from 'dotenv';
import type { PrismaConfig } from 'prisma';

dotenv.config();

console.log('Prisma config loaded');
console.log('Prisma config loaded', process.env.DATABASE_URL);

export default {
  earlyAccess: true,
  schema: './src/infra/prisma/schema.prisma',
} satisfies PrismaConfig;
