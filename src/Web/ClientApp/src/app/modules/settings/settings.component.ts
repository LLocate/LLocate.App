import { Component } from '@angular/core';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(public _global: Globals){
    _global.setTitle("Settings");
  }
}
