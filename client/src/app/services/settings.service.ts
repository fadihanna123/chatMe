import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private title: Title) {}

  /**
   * Set page title based on title value.
   * @function setPageTitle
   * @param { string } title - Page title
   * @returns { void }
   * @example this.settings.setPageTitle("Welcome page");
   */
  public setPageTitle(title: string): void {
    this.title.setTitle(title);
  }

  /**
   * Parse date time to ago value.
   * @function extractTime
   * @returns { string }
   * @example this.settings.extractTime(20231020);
   */
  public extractTime(date: Date): string {
    return dayjs(date).fromNow();
  }
}
