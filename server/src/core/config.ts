import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import AppLogger from './logger';
import { InternalServerError } from '../shared/errors';

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
    const err = error as Error;
    AppLogger.error(
      `Failed to read encryption file at ${keyPath}: ${err.message ?? 'Unknown error'}`,
    );
    throw new InternalServerError(
      `Failed to read encryption file at ${keyPath}`,
    );
  }
}

export const PUBLIC_KEY = readFile(getEnv('PUBLIC_KEY_PATH'));
export const PRIVATE_KEY = readFile(getEnv('PRIVATE_KEY_PATH'));
