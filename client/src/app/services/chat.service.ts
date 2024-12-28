import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

import { serverUrl } from '@core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public socket;

  constructor() {
    this.socket = io(serverUrl);

    this.socket.on('connect_error', (err: any) => {
      console.error(`❌ ${err instanceof Error}`);
      console.error(`❌ ${err.message}`);
      console.error(`❌ ${err.data}`);
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

  public getTypingStarted(): Observable<any> {
    return new Observable<string>((observer) => {
      this.socket.on('typing started', (data) => observer.next(data));

      return () => this.socket.disconnect();
    });
  }

  public getTypingStopped(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('typing stopped', (data) => observer.next(data));

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

  public handleTyping(isTyping: boolean, typingUser: string): void {
    let typingTimeOut: ReturnType<typeof setTimeout> | undefined = undefined;

    if (!isTyping) {
      isTyping = true;
      this.socket.emit('typing started', typingUser);
    }

    clearTimeout(typingTimeOut);
    typingTimeOut = setTimeout(() => {
      isTyping = false;
      this.socket.emit('typing stopped');
    }, 5000);
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
    return JSON.parse(sessionStorage.getItem(selected ?? 'All') ?? '[]');
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

      sessionStorage.setItem(selected ?? 'All', JSON.stringify(getCurrentData));
    } else {
      sessionStorage.setItem(selected ?? 'All', JSON.stringify([]));
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

  public findIfOnlineUserExists(
    nickName: string,
    onlineList: OnlineList[],
    id?: number
  ) {
    const foundOnlineUser = onlineList.find(
      (user) => user.nickname === nickName
    );
    if (foundOnlineUser) {
      return true;
    }

    return false;
  }

  /**
   * Send the new nickname to backend.
   * @function joinChat
   * @param { string } nickName
   * @param { number } id
   * @returns { void }
   * @example this.chat.joinChat("Erik", 123);
   */
  public joinChat(
    nickName: string,
    onlineList: OnlineList[],
    id?: number
  ): void {
    this.socket.emit('join', {
      userId: id ?? this.socket.id,
      nickname: nickName,
      status: 'online',
    });
  }
}
