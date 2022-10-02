import { Component, OnInit } from '@angular/core';
import { serverUrl } from '@core/environments/environment';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    io(serverUrl);
  }
}
