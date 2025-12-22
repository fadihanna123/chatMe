import { connection } from '../db';
import { fileCleaner } from './fileCleaner';

/**
 * Clean log and error data in the database and call fileCleaner.
 * @function logsRemover
 */

export const logsRemover = async () => {
  connection.query('DELETE FROM logs');
  connection.query('DELETE FROM errors');
  fileCleaner();
};
