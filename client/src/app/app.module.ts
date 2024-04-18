import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MsgFormComponent } from './msg-form/msg-form.component';
import { ChatService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './inc/header/header.component';
import { MessagesPanelComponent } from './messagesPanel/messagesPanel.component';
import { OnlineListComponent } from './onlineList/onlineList.component';

const declarations = [
  AppComponent,
  MsgFormComponent,
  HeaderComponent,
  MessagesPanelComponent,
  OnlineListComponent,
];

const imports = [
  BrowserModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  HttpClientModule,
];

const providers: any[] = [ChatService];

const bootstrap = [AppComponent];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap,
})
export class AppModule {}
