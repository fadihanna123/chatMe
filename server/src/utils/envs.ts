const { PORT, SSL_CRT_FILE, SSL_KEY_FILE, ORIGIN_URL } = process.env;

export const serverPort = PORT;

export const originUrl: string | undefined = ORIGIN_URL;

export const crtFile: string | undefined = SSL_CRT_FILE;

export const keyFile: string | undefined = SSL_KEY_FILE;
