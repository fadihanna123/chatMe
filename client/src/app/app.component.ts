import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircle, faRightToBracket, faSignal } from '@fortawesome/free-solid-svg-icons';
import load from 'audio-loader';
import play from 'audio-play';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { MessageList, OnlineList } from './models';
import { SettingsService } from './services';
import { ChatService } from './services/chat.service';

/**
 * @author Fadi Hanna <fhanna181@gmail.com>
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public joinForm!: FormGroup;
  public login: boolean = false;
  public noVal: boolean = false;
  public userId: string = '';
  public msgList: MessageList[] = [];
  public onlineList: OnlineList[] = [];
  public onlineIcon = faSignal;
  public joinIcon = faRightToBracket;
  public dotIcon = faCircle;
  public isSender: boolean = false;
  public selectedNickName: string = '';

  constructor(private chat: ChatService, private settings: SettingsService) {
    dayjs.extend(relativeTime);
    this.chat.getMessage().subscribe((data: MessageList) => {
      load('../assets/chat_alert.mp3').then(play);
      this.msgList.push(data);
    });

    this.chat
      .getNewUser()
      .subscribe((data: OnlineList) => this.onlineList.push(data));
    this.chat.disconnect().subscribe((data) => {
      const deletedItem = this.onlineList.find(
        (onlineUser: OnlineList) => onlineUser.userId === data.userId
      )!;

      deletedItem.status = deletedItem ? 'offline' : 'online';
    });
  }

  /**
   * Init join-form.
   */

  public initJoinForm() {
    this.joinForm = new FormGroup({
      nickName: new FormControl('', Validators.required),
    });
  }

  public nickNameTyper() {
    this.noVal = !this.joinForm.get('nickName')?.value ? true : false;
  }

  public openNewRoom(name?: string, id?: string) {
    if (!name && !id) {
      this.chat.openRoom('Group');
    } else {
      this.chat.openRoom(id!, 'Private');
      this.selectedNickName = name!;
    }
  }

  public enterMe() {
    if (!this.joinForm.get('nickName')?.value) {
      this.noVal = true;
      return;
    }

    this.chat.joinChat(this.joinForm.get('nickName')?.value);
    this.login = true;
    this.settings.setPageTitle('chatMe - Chat Room');
  }

  @HostListener('keydown', ['$event'])
  public onPressHandler(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.enterMe();
    }
  }

  public extractTime(date: Date) {
    return dayjs(date).fromNow();
  }

  public ngOnInit() {
    this.initJoinForm();
  }
}
