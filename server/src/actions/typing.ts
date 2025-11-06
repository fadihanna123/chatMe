import { Socket } from 'socket.io';
import { storeError } from 'utils';

const typingStarted = (nickName: string, socket: Socket) => {
  if (!nickName) storeError('No nickName provided!');

  try {
    socket.broadcast.emit('typing started', nickName);
  } catch (error) {
    storeError(error);
  }
};

const typingStopped = (socket: Socket) => {
  try {
    socket.broadcast.emit('typing stopped');
  } catch (error) {
    storeError(error);
  }
};

export { typingStarted, typingStopped };
