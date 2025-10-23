declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ORIGIN_URL: string;
      DATABASE_URL: string;
      DEBUGGING_ADMIN_URL: string;
      DEBUGGING_ADMIN__USERNAME: string;
      DEBUGGING_ADMIN_PSW: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }

  /**
   * @param { string } userid
   * @param { string } message
   * @param { string } nickname
   * @param { Date } date
   * @param { number } id
   */
  interface MessageList {
    userId: string;
    message: string;
    nickname: string;
    date: Date;
    id?: number;
  }

  /**
   * @param { string } id
   * @param { string } userid
   * @param { string } nickname
   * @param { string } nickname
   * @param { Date } date
   */
  interface OnlineList {
    id: string;
    userId: string;
    nickname: string;
    status: string;
    date: Date;
  }
}

export {};
