import { Injectable } from '@angular/core';
import { serverUrl } from '@core/environments/environment';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket = io(serverUrl);

  public sendMessage(msg: string) {
    this.socket.emit('sendMsg', msg);
  }

  public joinChat(id: string, name: string) {
    this.socket.emit('join', { id, name });
  }

  public getAllessages() {
    this.socket.on('receive', (msgList: []) => {
      return msgList;
    });
  }

  public getSocketId() {
    return this.socket.on('connect', () => this.socket.id);
  }
}
