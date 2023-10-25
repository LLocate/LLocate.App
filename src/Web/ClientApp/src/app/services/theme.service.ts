import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Globals } from './globals';
import { DarkModePreference } from '../web-api-client';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: boolean = false;
  // themes = ['theme-light','theme-dark'];
  themes = [
    { name: 'Default Light ', class: "" },
    { name: 'Deep Orange & Brown', class: "-deeporange-brown" },
    { name: 'Free Palestine', class: "-palestine" },
  ]
  currentTheme = "";
  theme = new BehaviorSubject('');
  darkMode = new BehaviorSubject(false);

  constructor(private ref: ApplicationRef, private _globals: Globals) {
    this.setSystemDefaultDarkMode();
  }

  public setSystemDefaultDarkMode(){
    // initially trigger dark mode if preference is set to dark mode on system
    // if (!this._globals.user || this._globals.user && this._globals.user.darkModePreference == DarkModePreference.SystemDefault) {
      const darkModeOn =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (darkModeOn) {
        this.isDarkMode = true;
        this.darkMode.next(true);
      }
      else {
        this.isDarkMode = false;
        this.darkMode.next(false);
      }
      this.theme.next(this.currentTheme);

      // watch for changes of the preference
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        console.log('change', e.matches)
        const turnOn = e.matches;
        if (turnOn) {
          this.isDarkMode = true;
          this.darkMode.next(true);
        }
        else {
          this.isDarkMode = false;
          this.darkMode.next(false);
        }
        this.theme.next(this.currentTheme);

        // trigger refresh of UI
        this.ref.tick();
      });
    }
  // }
}