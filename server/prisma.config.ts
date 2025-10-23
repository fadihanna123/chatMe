import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? './.docker.env' : './.env',
});

export default defineConfig({
  schema: './src/prisma/schema.prisma',
});
