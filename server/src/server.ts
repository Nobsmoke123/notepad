import './shared/types/global';
import http from 'node:http';
import app from './app';
import dotenv from 'dotenv';
import AppLogger from './core/logger';
import { getEnv } from './core/config';

dotenv.config();

const server = http.createServer(app);

const PORT = +getEnv('PORT');

async function startServer() {
  try {
    server.listen(PORT, () => {
      AppLogger.info(
        `Server is running on port ${PORT} with PID ${process.pid}`,
      );
    });
  } catch (error) {
    AppLogger.error('Error starting server', error);
  }
}

startServer();
