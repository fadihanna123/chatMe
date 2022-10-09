export class MessageList {
  constructor(
    public userId: string,
    public message: string,
    public nickname: string,
    public date: Date,
    public id?: number
  ) {}
}
