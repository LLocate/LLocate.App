import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: boolean = false;
  themes = ['theme-light','theme-dark'];
  theme = new BehaviorSubject('');

  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkModeOn) {
      this.theme.next('theme-dark');
      this.isDarkMode = true;
    }
    else{
      this.theme.next('theme-light');
      this.isDarkMode = false;
    }

    // watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      console.log('change', e.matches)
      const turnOn = e.matches;
      this.theme.next(turnOn ? 'theme-dark' : 'theme-light');

      // trigger refresh of UI
      this.ref.tick();
    });
  }
}