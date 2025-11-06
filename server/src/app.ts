import 'dotenv/config.js';
import { logger } from './tools';
import {
  debuggingUrl,
  originUrl,
  serverENV,
  serverPort,
  storeLog,
} from './utils';
import { PrismaClient } from '@prisma/client';
import type { Socket } from 'socket.io';
import { Server } from 'socket.io';
import {
  disconnect,
  join,
  joinRoom,
  sendMsg,
  typingStarted,
  typingStopped,
} from 'actions';

const io = new Server(Number(serverPort), {
  cors: {
    origin: [
      originUrl as string,
      serverENV === 'development' && (debuggingUrl as string),
    ],
    credentials: true,
  },
});

export const prisma = new PrismaClient();

io.on('connection', (socket: Socket) => {
  storeLog(`✅${socket.id} has connected`);
  logger.info(`✅${socket.id} has connected`, '', '');

  socket.on('sendMsg', (data: { roomId: string }) => sendMsg(data, socket, io));

  socket.on('joinRoom', async (data: { roomId: string }) => {
    joinRoom(data, socket);
  });

  socket.on('join', (data: OnlineList) => join(data, socket));

  socket.on('typing started', (nickName: string) => {
    typingStarted(nickName, socket);
  });

  socket.on('typing stopped', () => typingStopped(socket));

  socket.on('disconnect', () => disconnect(io, socket));
});
