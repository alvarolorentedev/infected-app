import * as winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'
import ENV from './constants'


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
  });

  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));

  if ( ENV.ENVIRONMENT === 'production' ) {
      console.log('adding loggly')
    logger.add(new Loggly({
        subdomain: ENV.LOGS_SUBDOMAIN,
        inputToken: ENV.LOGS_INPUT_TOKEN,
        tags: ['infecteed','app'],
        isBulk: true,
        stripColors: true
    }))
  }

  export default logger