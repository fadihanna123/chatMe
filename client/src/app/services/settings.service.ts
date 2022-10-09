import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private title: Title) {}

  /**
   * Set page title based on title value.
   *
   * @param title - Page title
   */

  public setPageTitle(title: string) {
    this.title.setTitle(title);
  }
}
