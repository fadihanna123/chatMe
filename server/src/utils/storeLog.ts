import { connection } from 'db';
import { DateTime } from 'luxon';

/**
 * Store server logs in the database.
 * @async
 * @function storeLog
 * @param { string } message - Log message.
 * @example storeLog("{ name: 'Test' }", "GET", "/");
 */
export const storeLog = async (message: string) => {
  const time: string = DateTime.fromJSDate(new Date()).toFormat(
    'yyyy-MM-dd HH:mm'
  );

  connection.query('INSERT INTO logs (message, time) VALUES (?, ?)', [
    message,
    time,
  ]);
};
