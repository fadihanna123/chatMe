import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faCircle,
  faRightToBracket,
  faSignal,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

  constructor(
    private chat: ChatService,
    private settings: SettingsService
  ) {
    dayjs.extend(relativeTime);
    this.chat.getMessage().subscribe((data: MessageList) => {
      this.msgList.push(data);
    });

    this.chat
      .getNewUser()
      .subscribe((user: OnlineList) => this.onlineList.push(user));
    this.chat.disconnect().subscribe((data) => {
      const deletedItem = this.onlineList.find(
        (onlineUser: OnlineList) => onlineUser.userId === data.userId
      );

      if (!deletedItem) return;
      deletedItem.status = deletedItem ? 'offline' : 'online';
    });
  }

  /**
   * Init join-form.
   * @function initJoinForm
   * @returns { void }
   * @example this.initJoinForm();
   */
  public initJoinForm(): void {
    this.joinForm = new FormGroup({
      nickName: new FormControl('', Validators.required),
    });
  }

  /**
   * Assign nickName to a variable.
   * @function nickNameTyper
   * @returns { void }
   * @example this.nickNameTyper();
   */
  public nickNameTyper(): void {
    this.noVal = !this.joinForm.get('nickName')?.value;
  }

  /**
   * Handle when a user login.
   * @function enterMe
   * @returns { void }
   * @example this.enterMe();
   */
  public enterMe(): void {
    if (!this.joinForm.get('nickName')?.value) {
      this.noVal = true;
      return;
    }

    this.chat.joinChat(this.joinForm.get('nickName')?.value);
    this.login = true;
    this.settings.setPageTitle('chatMe - Chat Room');
  }

  /**
   * Handle when user click Enter on login.
   * @function onPressHandler
   * @returns { void }
   * @example this.onPressHandler(e);
   */
  @HostListener('keydown', ['$event'])
  public onPressHandler(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.enterMe();
    }
  }

  /**
   * Handle when component renders.
   * @function ngOnInit
   * @returns { void }
   * @example this.ngOnInit();
   */
  public ngOnInit(): void {
    this.initJoinForm();
  }
}
