import dotenv from 'dotenv';
import type { PrismaConfig } from 'prisma';

dotenv.config();

export default {
  earlyAccess: true,
  schema: './src/infra/prisma/schema.prisma',
} satisfies PrismaConfig;
