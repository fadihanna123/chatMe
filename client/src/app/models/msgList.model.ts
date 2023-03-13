/**
 * @param { number } id
 * @param { string } userId
 * @param { string } message
 * @param { string } nickname
 * @param { Date } date
 */
export class MessageList {
  constructor(
    public id: number,
    public userId: string,
    public message: string,
    public nickname: string,
    public date: Date
  ) {}
}
