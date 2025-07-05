import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import AppLogger from './logger';

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    AppLogger.error(`Environment variable ${key} is not set.`);
    throw new InternalServerError(`Environment variable ${key} is not set.`);
  }
  return value as string;
}

function readFile(keyPath: string) {
  try {
    const resolvedPath = path.resolve(__dirname, keyPath);
    return fs.readFileSync(resolvedPath, 'utf-8');
  } catch (error) {
    AppLogger.error(`Failed to read file at ${keyPath}: ${error.message}`);
  }
}
