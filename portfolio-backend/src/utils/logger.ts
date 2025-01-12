// import winston from 'winston';

// const logger = winston.createLogger({
//   level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });
import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  transport: process.env.NODE_ENV !== 'production'? {
        target: 'pino-pretty', // Use the "pino-pretty" module for pretty printing
        options: {
          colorize: true, // Colorize output for better readability in development
        },
      }
    : undefined,
});



export default logger;