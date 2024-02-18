import { logger } from 'tools';
import { storeError } from './storeError';

/**
 * Handle server errors.
 * @function errorHandler
 * @param error
 */

export const errorHandler = (error: Error) => {
  if (error) {
    logger.error({ error: JSON.stringify(error.message) });
    storeError((error as Error).message, '', 'Server');
  }
};
