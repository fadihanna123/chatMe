import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsService } from '@app/services';

/**
 * @author Fadi Hanna
 */

@Component({
  selector: 'MessagesPanel',
  templateUrl: './messagesPanel.component.html',
  styleUrls: ['./messagesPanel.component.scss'],
  standalone: false,
})
export class MessagesPanelComponent {
  @Input() public msgList: MessageList[] = [];
  @Input() public joinForm!: FormGroup;

  constructor(public settings: SettingsService) {}
}
