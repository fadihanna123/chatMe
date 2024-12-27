import { DateTime } from 'luxon';
import winston, { format } from 'winston';

const myFormat = format.printf(({ level, message, timestamp }: any) => {
  timestamp = DateTime.fromJSDate(new Date(timestamp)).toFormat(
    'yyyy-MM-dd HH:mm'
  );

  return `{\n 'time': '${timestamp}', \n 'level': '${level}', \n 'message': '${message}'\n}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    new winston.transports.File({
      filename: 'src/logs/error.log',
      format: format.combine(
        format.prettyPrint(),
        format.timestamp(),
        myFormat
      ),
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'src/logs/info.log',
      format: format.combine(
        format.prettyPrint(),
        format.timestamp(),
        myFormat
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
