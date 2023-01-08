const {
  PORT,
  ORIGIN_URL,
  DEBUGGING_ADMIN_URL,
  DEBUGGING_ADMIN_USERNAME,
  DEBUGGING_ADMIN_PSW,
} = process.env;

export const serverPort = PORT;

export const originUrl: string | undefined = ORIGIN_URL;

export const debuggingUrl: string | undefined = DEBUGGING_ADMIN_URL;

export const adminUname: string | undefined = DEBUGGING_ADMIN_USERNAME;

export const adminPsw: string | undefined = DEBUGGING_ADMIN_PSW;
