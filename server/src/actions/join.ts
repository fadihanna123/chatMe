import { Socket } from 'socket.io';
import { storeError } from 'utils';

const date: Date = new Date();

const joinRoom = async (data: { roomId: string }, socket: Socket) => {
  try {
    if (data.roomId === 'Group') {
      await socket.join('Group');
      socket.broadcast.to('Group').emit('new message');
    } else {
      await socket.join(data.roomId);
    }
  } catch (error) {
    storeError(error);
  }
};

const join = (data: OnlineList, socket: Socket) => {
  if (!data) storeError('No data provided!');

  /**
   * @param { string } userId
   * @param { string } nickname
   * @param { string } status
   * @param { Date } date
   */
  const payload = {
    userId: data.userId,
    nickname: data.nickname,
    status: data.status,
    date,
  };

  try {
    socket.broadcast.emit('new user', payload);
    socket.broadcast.emit('login', true);
  } catch (error) {
    storeError(error);
  }
};

export { joinRoom, join };
