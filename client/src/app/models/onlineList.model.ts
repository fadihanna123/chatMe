/**
 * @param { string } id
 * @param { string } userId
 * @param { string } message
 * @param { string } status
 * @param { Date } date
 */
export class OnlineList {
  constructor(
    public id: string,
    public userId: string,
    public nickname: string,
    public status: string,
    public date: Date
  ) {}
}
