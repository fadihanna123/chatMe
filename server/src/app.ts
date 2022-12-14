import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { instrument } from '@socket.io/admin-ui';
import { MessageList, OnlineList } from 'models';
import { Server } from 'socket.io';
import { logger } from 'tools';
import { adminPsw, adminUname, debuggingUrl, originUrl, serverPort } from 'utils';

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

io.on('connection', async (socket) => {
  const date = new Date();
  console.log(`${socket.id} has connected`);
  // storeLog(`${socket.id} has connected`, '', '');
  logger.info(`${socket.id} has connected`, '', '');

  socket.on('sendMsg', async (data: MessageList) => {
    /*  const payload: MessageList = {
      userId: data.userId,
      nickname: data.nickname,
      message: data.message,
      date,
    }; */

    // await prisma.messages.create({
    //   data: payload,
    // });

    io.sockets.emit('new message', data);
  });

  socket.on('joinRoom', async (data: any) => {
    if (data.roomId === 'Group') {
      socket.join('Group');
      socket.broadcast.to('Group').emit('new message');
    } else {
      socket.join(data.roomId);
      socket.broadcast.to(data.roomId).emit('new message');
    }
  });

  socket.on('join', async (data: OnlineList) => {
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

  socket.on('disconnect', async () => {
    const data = { userId: socket.id };
    // await prisma.onlinelist.deleteMany({ where: data });

    io.sockets.emit('deleted user', data);
  });
});
