import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public enterForm!: FormGroup;
  public id: any = '';

  constructor(private chat: ChatService) {}

  public initForm() {
    this.enterForm = new FormGroup({
      nickName: new FormControl(''),
    });
  }

  // public saveEnterVal(event: Event) {
  //   const enterVal = (event.target as HTMLInputElement).value;
  //   console.log(this.enterForm);
  // }

  public enterMe() {
    // this.chat.joinChat(
    //   this.chat.getSocketId(),
    //   this.enterForm.get('nickName')?.value
    // );
  }

  public ngOnInit() {
    this.initForm();
    this.id = this.chat.getSocketId();
    console.log(this.id);
  }
}
