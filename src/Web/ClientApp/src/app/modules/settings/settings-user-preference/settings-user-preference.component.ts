import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/services/globals';
import { DarkModePreference, UsersClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-settings-user-preference',
  templateUrl: './settings-user-preference.component.html',
  styleUrls: ['./settings-user-preference.component.css']
})
export class SettingsUserPreferenceComponent {
  isLoading = true;

  darkModePreference = DarkModePreference;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    defaultTheme: new FormControl('', Validators.required),
    darkModePreference: new FormControl(DarkModePreference.SystemDefault, [Validators.required, Validators.min(0), Validators.max(2)]),
    currencyCode: new FormControl('', Validators.required)
  });

  constructor(public _global: Globals,
    private router: Router,
    private userClient: UsersClient) {
      this.getUser();
  }
  
  getUser() {
    this.isLoading = true;
    this.userClient.getUser().subscribe(res => {
      if (res && res.email) {
      }
      this.isLoading = false;
    },
    (err) =>{
      this.isLoading = false;
    })
  }

  onSubmit() {

  }
}
