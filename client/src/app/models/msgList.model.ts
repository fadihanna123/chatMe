export class MessageList {
  constructor(
    public id: number,
    public userId: string,
    public message: string,
    public nickname: string,
    public date: Date
  ) {}
}
