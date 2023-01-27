import { prisma } from 'app';
import { DateTime } from 'luxon';

/**
 * Store server logs in the database.
 *
 * @async
 * @function storeLog
 * @param { string } message
 * @param { string } method
 * @param { string } located
 */
export const storeLog = async (
  message: string,
  method: string,
  located: string
) => {
  const time: string = DateTime.fromJSDate(new Date()).toFormat(
    'yyyy-MM-dd HH:mm'
  );

  await prisma.logs.create({
    data: {
      message,
      method,
      located,
      time,
    },
  });
};
