import winston from 'winston';

import dotEnvConfig from '../configs/dotEnv.config';

const { combine, timestamp, colorize, json, prettyPrint } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'redBG white bold underline',
  warn: 'yellowBG white bold underline',
  info: 'cyanBG white bold underline',
  http: 'greenBG white bold underline',
  debug: 'whiteBG white bold underline',
};

winston.addColors(colors);

const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  json({
    space: 2,
    replacer: (key, value) => {
      if (key === 'password') return undefined;
      return value;
    },
  })
);

const consoleTransport = new winston.transports.Console({
  format: combine(colorize({ all: true })),
});

const fileTransport = (filename, level = 'info') =>
  new winston.transports.File({
    level,
    filename: `src/logs/${filename}.log`,
    format: level === 'error' ? combine(format, prettyPrint()) : format,
    maxsize: '10000000',
    maxFiles: '10',
  });

const transports = [
  consoleTransport,
  fileTransport('error', 'error'),
  fileTransport('combined'),
];

const logger = winston.createLogger({
  level: dotEnvConfig.ENV === 'development' ? 'debug' : 'warn',
  levels,
  format,
  transports,
});

export default logger;
