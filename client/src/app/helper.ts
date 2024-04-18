import dayjs from 'dayjs';

/**
 * Parse date time to ago value.
 * @function extractTime
 * @returns { string }
 * @example extractTime(20231020);
 */
const extractTime = (date: Date): string => {
  return dayjs(date).fromNow();
};

export { extractTime };
