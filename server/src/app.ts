import 'dotenv/config';

import { readFileSync } from 'fs';
import { createServer } from 'https';
import { Server } from 'socket.io';
import { logger } from 'tools';
import { crtFile, keyFile, originUrl, serverPort, storeLog } from 'utils';

const httpServer = createServer({
  key: readFileSync(keyFile as string),
  cert: readFileSync(crtFile as string),
});

const io = new Server(httpServer, {
  cors: {
    origin: originUrl,
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.id} has connected`);
  storeLog(`${socket.id} has connected`, '', '');
  logger.info(`${socket.id} has connected`, '', '');
});

httpServer.listen(serverPort);
