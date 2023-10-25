import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  isDarkTheme: boolean = false;

  constructor(private overlayContainer: OverlayContainer,
    public themeService: ThemeService) {
    // Initialize isDarkTheme based on the current theme
    themeService.darkMode.subscribe(res => this.isDarkTheme = res);
  }

  toggleDarkMode() {
    let newValue = !this.isDarkTheme;
    this.themeService.isDarkMode = newValue;
    this.themeService.darkMode.next(newValue);
    this.themeService.theme.next(this.themeService.currentTheme);
  }
  
  applyTheme(cssClass: string){
    this.themeService.currentTheme = cssClass;
    this.themeService.theme.next(this.themeService.currentTheme);
  }
}
