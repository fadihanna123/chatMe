declare global {
  /**
   * @param { string } msg
   * @param { string } nickName
   * @param { Date } date
   */
  interface Message {
    msg: string;
    nickName: string;
    date: Date;
  }

  /**
   * @param { number } id
   * @param { string } userId
   * @param { string } message
   * @param { string } nickname
   * @param { Date } date
   */
  interface MessageList {
    id: number;
    userId: string;
    message: string;
    nickname: string;
    date: Date;
  }

  /**
   * @param { string } id
   * @param { string } userId
   * @param { string } message
   * @param { string } status
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
