import { prisma } from 'app';
import { DateTime } from 'luxon';

/**
 * Store errors in the database.
 * @async
 * @function storeError
 * @param { string } message - Error message.
 * @example storeError("Error!");
 */
export const storeError = async (message: string): Promise<void> => {
  if (!message) console.log('No error message provided...');

  const time = DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd HH:mm');

  await prisma.errors.create({
    data: {
      message,
      time,
    },
  });
};
