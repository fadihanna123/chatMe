/**
 * @param { string } id
 * @param { string } userid
 * @param { string } nickname
 * @param { string } nickname
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
