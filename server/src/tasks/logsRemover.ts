import { prisma } from '../app';
import { fileCleaner } from './fileCleaner';

/**
 * Clean log and error data in the database and call fileCleaner.
 * @function logsRemover
 */

export const logsRemover = async () => {
  await prisma.logs.deleteMany();
  await prisma.errors.deleteMany();
  fileCleaner();
};

