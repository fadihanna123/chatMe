const {
  PORT,
  ORIGIN_URL,
  DEBUGGING_ADMIN_URL,
  DEBUGGING_ADMIN_USERNAME,
  DEBUGGING_ADMIN_PSW,
} = process.env;

export const serverPort = PORT;

/**
 * @type { string | undefined }
 */
export const originUrl: string | undefined = ORIGIN_URL;

/**
 * @type { string | undefined }
 */
export const debuggingUrl: string | undefined = DEBUGGING_ADMIN_URL;

/**
 * @type { string | undefined }
 */
export const adminUname: string | undefined = DEBUGGING_ADMIN_USERNAME;

/**
 * @type { string | undefined }
 */
export const adminPsw: string | undefined = DEBUGGING_ADMIN_PSW;
