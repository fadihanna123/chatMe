import 'dotenv/config';

import { onlinelist, PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { MessageList } from 'models';
import { Server } from 'socket.io';
import { logger } from 'tools';
import { crtFile, keyFile, originUrl, serverPort, storeLog } from 'utils';

const httpsServer = createServer({
  key: readFileSync(keyFile as string),
  cert: readFileSync(crtFile as string),
});

const io = new Server(httpsServer, {
  cors: {
    origin: originUrl,
  },
});

export const prisma = new PrismaClient();

io.on('connection', async (socket) => {
  const date = new Date();
  console.log(`${socket.id} has connected`);
  storeLog(`${socket.id} has connected`, '', '');
  logger.info(`${socket.id} has connected`, '', '');

  socket.on('sendMsg', async (data: MessageList) => {
    const payload: MessageList = {
      userId: data.userId,
      nickname: data.nickname,
      message: data.message,
      date,
    };

    await prisma.messages.create({
      data: payload,
    });

    io.sockets.emit('new message', data);
  });

  socket.on('join', async (data: onlinelist) => {
    const payload = {
      userId: data.userId,
      nickname: data.nickname,
      status: data.status,
      date,
    };

    await prisma.onlinelist.create({
      data: payload,
    });

    socket.emit('login', true);
    socket.broadcast.emit('new user', data);
  });

  socket.on('disconnect', async () => {
    const data = { userId: socket.id };
    await prisma.onlinelist.deleteMany({ where: data });

    io.sockets.emit('deleted user', data);
  });
});

httpsServer.listen(serverPort);
