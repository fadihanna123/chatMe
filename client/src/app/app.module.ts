import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from '@app/app.component';
import { MsgFormComponent } from '@app/msg-form/msg-form.component';
import { ChatService } from '@app/services';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from '@app/inc/header/header.component';
import { MessagesPanelComponent } from '@app/messagesPanel/messagesPanel.component';
import { OnlineListComponent } from '@app/onlineList/onlineList.component';

const declarations = [
  AppComponent,
  MsgFormComponent,
  HeaderComponent,
  MessagesPanelComponent,
  OnlineListComponent,
];

const imports = [BrowserModule, ReactiveFormsModule, FontAwesomeModule];

const providers: any[] = [ChatService, provideHttpClient()];

const bootstrap = [AppComponent];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap,
})
export class AppModule {}
