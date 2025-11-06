import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { storeError } from 'utils';

const disconnect = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) => {
  /**
   * @param { string } userId
   */
  const data = { userId: socket.id };

  try {
    io.sockets.emit('deleted user', data);
  } catch (error) {
    storeError(error);
  }
};

export { disconnect };
