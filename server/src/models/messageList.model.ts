/**
 * @param { string } userid
 * @param { string } message
 * @param { string } nickname
 * @param { Date } date
 * @param { number } id
 */
export class MessageList {
  constructor(
    public userId: string,
    public message: string,
    public nickname: string,
    public date: Date,
    public id?: number
  ) {}
}
