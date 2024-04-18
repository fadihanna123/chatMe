import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { extractTime } from 'app/helper';

/**
 * @author Fadi Hanna <fhanna181@gmail.com>
 */

@Component({
  selector: 'MessagesPanel',
  templateUrl: './messagesPanel.component.html',
  styleUrls: ['./messagesPanel.component.scss'],
})
export class MessagesPanelComponent {
  @Input() public msgList: MessageList[] = [];
  @Input() public joinForm!: FormGroup;
  public extractTime = extractTime;
}
