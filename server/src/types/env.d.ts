declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ORIGIN_URL: string;
      DATABASE_URL: string;
      DEBUGGING_ADMIN_URL: string;
      DEBUGGING_ADMIN__USERNAME: string;
      DEBUGGING_ADMIN_PSW: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
