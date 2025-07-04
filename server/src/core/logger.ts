import winston from 'winston';

const AppLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  AppLogger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
    }),
  );
}

export default AppLogger;
