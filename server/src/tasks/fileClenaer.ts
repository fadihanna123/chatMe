import fs from 'fs';

/**
 * Clean log and error files.
 *
 * @function fileCleaner
 * @example fileCleaner():
 */
export const fileCleaner = () => {
  const logsPath = './src/logs/debug.log';
  const errorPath = './src/logs/error.log';
  const newValue = '';

  fs.promises
    .readFile(logsPath)
    .then(() => {
      fs.promises.writeFile(errorPath, newValue).catch((err) => {
        if (err) {
          throw err;
        }
      });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};
