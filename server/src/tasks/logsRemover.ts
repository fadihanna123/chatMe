import { fileCleaner } from './fileClenaer';
import { prisma } from '@core/app';

/**
 * Clean log and error data in the database and call fileCleaner.
 * @function logsRemover
 */

export const logsRemover = async () => {
  await prisma.logs.deleteMany();
  await prisma.errors.deleteMany();
  fileCleaner();
};
