import { Injectable } from '@angular/core';
import { serverUrl } from '@core/environments/environment';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

import { MessageList, OnlineList } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket;

  constructor() {
    this.socket = io(serverUrl);
  }

  public getMessage(): Observable<any> {
    return new Observable<MessageList>((observer) => {
      this.socket.on('new message', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  public getNewUser(): Observable<any> {
    return new Observable<OnlineList>((observer) => {
      this.socket.on('new user', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  public disconnect(): Observable<any> {
    return new Observable<OnlineList>((observer) => {
      this.socket.on('deleted user', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  /**
   * Send a message to backend.
   *
   * @param nickName - Nickname
   * @param msg - Message
   */

  public sendMessage(nickName: string, msg: string) {
    this.socket.emit('sendMsg', {
      userId: this.socket.id,
      nickname: nickName,
      message: msg,
      date: new Date(),
    });
  }

  /**
   * Send the new nickname to backend.
   *
   * @param nickName - Nickname
   */

  public joinChat(nickName: string) {
    this.socket.emit('join', {
      userId: this.socket.id,
      nickname: nickName,
      status: 'online',
    });
  }
}
