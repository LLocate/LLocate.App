import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-theme-preview-svg',
  templateUrl: './theme-preview-svg.component.html',
  styleUrls: ['./theme-preview-svg.component.css']
})
export class ThemePreviewSvgComponent {
  @Input() primary: string = '';
  @Input() accent: string = '';
  @Input() background: string = '';
}
