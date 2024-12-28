import { Component, Input } from '@angular/core';
import { faCircle, faSignal } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '@app/services';

@Component({
  selector: 'OnlineList',
  templateUrl: './onlineList.component.html',
  standalone: false,
})
export class OnlineListComponent {
  @Input() public onlineList!: OnlineList[];
  @Input() public selectedNickName!: string;
  public onlineIcon = faSignal;
  public dotIcon = faCircle;

  constructor(private chat: ChatService) {}

  /**
   * Opens a room.
   * @function openNewRoom
   * @returns { void }
   * @example this.openNewRoom("Erik", 123);
   */
  public openNewRoom(name?: string, id?: string): void {
    if (!name && !id) {
      this.chat.openRoom('Group');
    } else {
      if (!id) return;
      this.chat.openRoom(id, 'Private');
      if (!name) return;
      this.selectedNickName = name;
    }
  }
}
