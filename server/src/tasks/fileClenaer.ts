import fs from 'fs';

/**
 * Clean log and error files.
 *
 * @function fileCleaner
 */
export const fileCleaner = () => {
  const logsPath: string = './src/logs/debug.log';
  const errorPath: string = './src/logs/error.log';
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
