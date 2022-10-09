import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircle, faRightToBracket, faSignal } from '@fortawesome/free-solid-svg-icons';
import load from 'audio-loader';
import play from 'audio-play';
import * as dayjs from 'dayjs';
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

  constructor(private chat: ChatService, private settings: SettingsService) {
    dayjs.extend(relativeTime);
    this.chat.getMessage().subscribe((data) => {
      load('../assets/chat_alert.mp3').then(play);
      this.msgList.push(data);
    });

    this.chat.getNewUser().subscribe((data) => this.onlineList.push(data));
    this.chat.disconnect().subscribe((data) => {
      const deletedItem = this.onlineList.find(
        (x) => x.userId === data.userId
      )!;

      if (deletedItem) {
        deletedItem.status = 'offline';
      }
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
    if (!this.joinForm.get('nickName')?.value) {
      this.noVal = true;
    } else {
      this.noVal = false;
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
