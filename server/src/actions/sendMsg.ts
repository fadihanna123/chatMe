import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { storeError } from 'utils';

const sendMsg = (
  data: { roomId: string },
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  try {
    if (data.roomId) {
      socket.broadcast.to(data.roomId).emit('new message');
    } else {
      io.sockets.emit('new message', data);
    }
  } catch (error) {
    storeError(error);
  }
};

export { sendMsg };
