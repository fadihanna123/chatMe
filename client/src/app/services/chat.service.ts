import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

import { serverUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket;

  constructor() {
    this.socket = io(serverUrl);

    this.socket.on('connect_error', (err) => {
      console.log(err instanceof Error);
      console.log(err.message);
      console.log((err as any).data);
      this.socket.connect();
    });

    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  /**
   * Get every new message from the server.
   * @function getMessage
   * @returns { Observable<any> } An observable
   * @example this.chat.getMessage();
   */
  public getMessage(): Observable<any> {
    return new Observable<MessageList>((observer) => {
      this.socket.on('new message', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  /**
   * Get every new user from the server.
   * @function getNewUser
   * @returns { Observable<any> } An observable
   * @example this.chat.getNewUser();
   */
  public getNewUser(): Observable<any> {
    return new Observable<OnlineList>((observer) => {
      this.socket.on('new user', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  /**
   * Detect when a user disconnects.
   * @function disconnect
   * @returns { Observable<any> } An observable
   * @example this.chat.disconnect();
   */
  public disconnect(): Observable<any> {
    return new Observable<OnlineList>((observer) => {
      this.socket.on('deleted user', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  /**
   * Send a message to backend.
   * @function sendMessage
   * @param nickName - Nickname
   * @param msg - Message
   * @example this.chat.sendMessage("Erik", "Hi!");
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

  /**
   * Get sessionStorage data.
   * @function getStorage
   * @param { string } selected
   * @returns { [] } An Array
   * @example this.chat.getStorage("123");
   */
  public getStorage(selected?: string): [] {
    return JSON.parse(
      sessionStorage.getItem(selected ? selected : 'All') || '[]'
    );
  }

  /**
   * Set sessionStorage data.
   * @function setStorage
   * @param { Message } data
   * @param { string } selected
   * @returns { void }
   * @example this.chat.setStorage({ msg: "Hi", nickName: "Erik", date: 20225551747445 }, "123");
   */
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
   * @function openRoom
   * @param { string } id - Id of the user
   * @param roomType - Group or Private
   * @example this.chat.openRoom("123", "Private");
   */
  public openRoom(id: string, roomType = 'Group'): void {
    this.socket.emit('joinRoom', {
      roomId: roomType === 'Group' ? 'Group' : id,
    });
  }

  /**
   * Send the new nickname to backend.
   * @function joinChat
   * @param { string } nickName
   * @param { number } id
   * @returns { void }
   * @example this.chat.joinChat("Erik", 123);
   */
  public joinChat(nickName: string, id?: number): void {
    this.socket.emit('join', {
      userId: id ? id : this.socket.id,
      nickname: nickName,
      status: 'online',
    });
  }
}
