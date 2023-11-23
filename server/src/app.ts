import 'dotenv/config.js';
import { PrismaClient } from '@prisma/client';
import { instrument } from '@socket.io/admin-ui';
import type { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { logger } from 'tools';
import {
  adminPsw,
  adminUname,
  debuggingUrl,
  originUrl,
  serverPort,
} from 'utils';

const io = new Server(Number(serverPort), {
  cors: {
    origin: [originUrl as string, debuggingUrl as string],
    credentials: true,
  },
});

instrument(io, {
  auth: {
    type: 'basic',
    username: adminUname as string,
    password: adminPsw as string,
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
});

export const prisma = new PrismaClient();

io.on('connection', (socket: Socket) => {
  const date: Date = new Date();
  // eslint-disable-next-line no-console
  console.log(`✅${socket.id} has connected`);
  // storeLog(`${socket.id} has connected`, '', '');
  logger.info(`✅${socket.id} has connected`, '', '');

  socket.on('sendMsg', (data: { roomId: string }) => {
    /*  const payload: MessageList = {
      userId: data.userId,
      nickname: data.nickname,
      message: data.message,
      date,
    }; */

    // await prisma.messages.create({
    //   data: payload,
    // });
    if (data.roomId) {
      socket.broadcast.to(data.roomId).emit('new message');
    } else {
      io.sockets.emit('new message', data);
    }
  });

  socket.on('joinRoom', async (data: { roomId: string }) => {
    if (data.roomId === 'Group') {
      await socket.join('Group');
      socket.broadcast.to('Group').emit('new message');
    } else {
      await socket.join(data.roomId);
    }
  });

  socket.on('join', (data: OnlineList) => {
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

    // await prisma.onlinelist.create({
    //   data: payload,
    // });

    socket.broadcast.emit('new user', payload);
    socket.broadcast.emit('login', true);
  });

  socket.on('disconnect', () => {
    /**
     * @param { string } userId
     */
    const data = { userId: socket.id };
    // await prisma.onlinelist.deleteMany({ where: data });

    io.sockets.emit('deleted user', data);
  });
});
