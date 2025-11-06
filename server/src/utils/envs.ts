const {
  DEV_PORT,
  ORIGIN_URL,
  DEBUGGING_ADMIN_URL,
  DEBUGGING_ADMIN_USERNAME,
  DEBUGGING_ADMIN_PSW,
  NODE_ENV,
} = process.env;

export const serverPort = DEV_PORT;

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

export const serverENV: string | undefined = NODE_ENV;
