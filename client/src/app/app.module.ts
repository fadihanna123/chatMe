import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';

const declarations = [AppComponent];

const imports = [BrowserModule, ReactiveFormsModule];

const providers: any[] = [ChatService];

const bootstrap = [AppComponent];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap,
})
export class AppModule {}
