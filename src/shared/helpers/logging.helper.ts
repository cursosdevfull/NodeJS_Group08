import * as wins from 'winston';
const logstash = require('winston-logstash-transport');

const MESSAGE = Symbol.for('message');
const LEVEL = Symbol.for('level');

const errorToLog = (log: any) => {
  const formatted: any = {
    message: null,
    level: 'error',
  };

  formatted[LEVEL] = 'error';

  if (log.message) {
    formatted[MESSAGE] = `${log.message}: ${log.stack}`;
  } else {
    formatted[MESSAGE] = log.stack;
  }

  return formatted;
};

const errorFormatter = (logEntry: any) => {
  if (logEntry instanceof Error) {
    return errorToLog(logEntry);
  }

  if (logEntry.stack) {
    logEntry.message = `${logEntry.message}: ${logEntry.stack}`;
  }

  if (logEntry.message?.err instanceof Error) {
    return errorToLog(logEntry.message.err);
  }
  logEntry.message = JSON.stringify(logEntry.message);

  return logEntry;
};

const consoleTransport = new wins.transports.Console({
  format: wins.format.combine(
    wins.format.colorize(),
    wins.format.cli({
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'green',
        verbose: 'cyan',
        debug: 'white',
      },
    })
  ),
  handleExceptions: true,
});

const logstashTransport = new logstash.LogstashTransport({
  host: 'localhost',
  port: 1514,
});

const envTag = (logEntry: any) => {
  const tag = {
    env: process.env.APPLICATION_ENV || 'local',
  };
  const taggedLog = Object.assign(tag, logEntry);
  logEntry[MESSAGE] = JSON.stringify(taggedLog);
  return logEntry;
};

const transports: any = [consoleTransport, logstashTransport];

const logger: any = wins.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: wins.format.combine(
    wins.format(errorFormatter)(),
    wins.format(envTag)()
  ),
  transports,
});

logger.stream = {
  write(message: any, _encoding: any) {
    logger.http(message);
  },
};

export default logger;
