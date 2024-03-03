import { storeError } from './storeError';
import { logger } from 'tools';

/**
 * Handle server errors.
 * @function errorHandler
 * @param error
 */

export const errorHandler = (error: Error) => {
  if (error) {
    logger.error({ error: JSON.stringify(error.message) });
    void storeError(error.message, '', 'Server');
  }
};
