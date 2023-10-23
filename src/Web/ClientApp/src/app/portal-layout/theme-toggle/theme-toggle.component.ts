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
    private themeService: ThemeService) {
    // Initialize isDarkTheme based on the current theme
    this.isDarkTheme = themeService.isDarkMode;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const themeClass = this.isDarkTheme ? 'theme-dark' : 'theme-light';
    this.themeService.theme.next(themeClass);

  }
  
}
