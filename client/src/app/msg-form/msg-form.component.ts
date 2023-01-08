import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { MessageList } from '../models';
import { ChatService } from '../services';

@Component({
  selector: 'msgForm',
  templateUrl: './msg-form.component.html',
  styleUrls: ['./msg-form.component.scss'],
})
export class MsgFormComponent implements OnInit {
  @Input() joinForm!: FormGroup;
  @Input() msgList!: MessageList[];
  @Input() selectedNickName!: string;
  @ViewChild('msgInput', { static: true }) msgInput!: ElementRef;

  public msgForm!: FormGroup;
  public sendIcon = faPaperPlane;

  constructor(private chat: ChatService) {}

  /**
   * Init message-form.
   */

  public initMsgForm() {
    this.msgForm = new FormGroup({
      msg: new FormControl('', Validators.required),
    });
  }

  public sendMsg() {
    const nickName = this.selectedNickName
      ? this.selectedNickName
      : this.joinForm.get('nickName')?.value;
    const msg = this.msgForm.get('msg')?.value;

    if (!msg) {
      return;
    }

    this.chat.sendMessage(nickName, msg);
    this.chat.setStorage({ nickName, msg, date: new Date() });
    this.msgInput.nativeElement.value = '';
  }

  @HostListener('keydown', ['$event'])
  public onPressHandler(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.sendMsg();
    }
  }

  public ngOnInit() {
    this.initMsgForm();
  }
}
