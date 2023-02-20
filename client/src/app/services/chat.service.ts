import { Injectable } from '@angular/core';
import { serverUrl } from '@core/environments/environment';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

import { Message, MessageList, OnlineList } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket;

  constructor() {
    this.socket = io(serverUrl);

    this.socket.on('connect_error', (err: any) => {
      // eslint-disable-next-line no-console
      console.log(err instanceof Error); // true
      // eslint-disable-next-line no-console
      console.log(err.message); // not authorized
      // eslint-disable-next-line no-console
      console.log(err.data); // { content: "Please retry later" }
      this.socket.connect();
    });

    if (!this.socket.connected) {
      this.socket.connect();
    }
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
    const data = {
      userId: this.socket.id,
      nickname: nickName,
      message: msg,
      date: new Date(),
    };

    this.socket.emit('sendMsg', data);
  }

  public getStorage(selected?: string): [] {
    return JSON.parse(
      sessionStorage.getItem(selected ? selected : 'All') || '[]'
    );
  }

  public setStorage(data: Message, selected?: string): void {
    const getCurrentData: Message[] = this.getStorage();

    if (getCurrentData) {
      getCurrentData.push(data);

      sessionStorage.setItem(
        selected ? selected : 'All',
        JSON.stringify(getCurrentData)
      );
    } else {
      sessionStorage.setItem(selected ? selected : 'All', JSON.stringify([]));
    }
  }

  /**
   * Opens a new room.
   *
   * @param id - Id of the user
   * @param roomType - Group or Private
   */

  public openRoom(id: string, roomType: string = 'Group'): void {
    this.socket.emit('joinRoom', {
      roomId: roomType === 'Group' ? 'Group' : id,
    });
  }

  /**
   * Send the new nickname to backend.
   *
   * @param nickName - Nickname
   */

  public joinChat(nickName: string, id?: number) {
    this.socket.emit('join', {
      userId: id ? id : this.socket.id,
      nickname: nickName,
      status: 'online',
    });
  }
}
