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

  fs.readFile(logsPath, 'utf-8', (err) => {
    if (err) {
      throw err;
    }

    fs.writeFile(logsPath, newValue, 'utf-8', (err) => {
      if (err) {
        throw err;
      }
    });
  });

  fs.readFile(errorPath, 'utf-8', (err) => {
    if (err) {
      throw err;
    }

    fs.writeFile(errorPath, newValue, 'utf-8', (err) => {
      if (err) {
        throw err;
      }
    });
  });
};
