import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { ChatService } from '@app/services';

@Component({
  selector: 'msgForm',
  templateUrl: './msg-form.component.html',
  standalone: false,
})
export class MsgFormComponent implements OnInit {
  @Input() public joinForm!: FormGroup;
  @Input() public msgList!: MessageList[];
  @Input() public selectedNickName!: string;
  @Input() public isTyping!: boolean;
  @Input() public typingUser!: string;
  @ViewChild('msgInput', { static: true }) msgInput!: ElementRef;

  public msgForm!: FormGroup;
  public sendIcon = faPaperPlane;

  constructor(public chat: ChatService) {}

  /**
   * Init message-form.
   * @function initMsgForm
   * @returns { void }
   * @example this.initMsgForm();
   */
  public initMsgForm(): void {
    this.msgForm = new FormGroup({
      msg: new FormControl('', Validators.required),
    });
  }

  /**
   * Handle when sending messages to the server.
   * @function initMsgForm
   * @returns { void }
   * @example this.sendMsg();
   */
  public sendMsg(): void {
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

  /**
   * Handle when click enter key.
   * @function onPressHandler
   * @returns { void }
   * @example this.onPressHandler();
   */
  @HostListener('keydown', ['$event'])
  public onPressHandler(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.sendMsg();
    }
  }

  /**
   * Handle when component renders.
   * @function ngOnInit
   * @returns { void }
   * @example this.ngOnInit();
   */
  public ngOnInit(): void {
    this.initMsgForm();
  }
}
