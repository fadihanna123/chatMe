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
   * @function setPageTitle
   * @param { string } title - Page title
   * @returns { void }
   * @example this.settings.setPageTitle("Welcome page");
   */
  public setPageTitle(title: string): void {
    this.title.setTitle(title);
  }
}
