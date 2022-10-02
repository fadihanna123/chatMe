import { logger } from 'tools';

import { storeError } from './storeError';

/**
 * Handle server errors.
 *
 * @param error
 */

export const errorHandler = (error: Error) => {
  if (error) {
    logger.error({ error: JSON.stringify(error.message) });
    storeError((error as Error).message, '', 'Server');
  }
};
