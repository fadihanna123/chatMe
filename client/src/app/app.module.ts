import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MsgFormComponent } from './msg-form/msg-form.component';
import { ChatService } from './services/chat.service';

const declarations = [AppComponent, MsgFormComponent];

const imports = [BrowserModule, ReactiveFormsModule, FontAwesomeModule];

const providers: any[] = [ChatService];

const bootstrap = [AppComponent];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap,
})
export class AppModule {}
