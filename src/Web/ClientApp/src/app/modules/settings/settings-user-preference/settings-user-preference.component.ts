
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Globals } from 'src/app/services/globals';
import { ThemeService } from 'src/app/services/theme.service';
import { AppConstants } from 'src/app/shared/constants';
import { SharedModule } from 'src/app/shared/shared.module';
import { DarkModePreference, UpdateUserCommand, UpdateUserDto, UsersClient } from 'src/app/web-api-client';

@Component({
  standalone: true,
  imports: [
    SharedModule,
    FormsModule
],
  selector: 'app-settings-user-preference',
  templateUrl: './settings-user-preference.component.html',
  styleUrls: ['./settings-user-preference.component.css']
})
export class SettingsUserPreferenceComponent {
  @Input() submitButtonText = "Submit";
  @Output() formSubmitted = new EventEmitter<any>();
  isLoading = true;
  currencies = AppConstants.currencies;
  themes = [];

  darkModePreference = DarkModePreference;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    defaultTheme: new FormControl(''),
    darkModePreference: new FormControl(DarkModePreference.SystemDefault, [Validators.required, Validators.max(2)]),
    currencyCode: new FormControl('MYR', Validators.required)
  });

  constructor(public _global: Globals,
    private router: Router,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
    private userClient: UsersClient) {
      this.themes = themeService.themes;
      this.getUser();
  }
  
  getUser(update = false) {
    this.isLoading = true;
    this.userClient.getUser().subscribe(res => { 
      if(update)
        this._global.setUser(res);
      if (res && res.email) {
        this.userForm.controls.name.setValue(res.name);
        this.userForm.controls.defaultTheme.setValue(res.defaultTheme);
        this.userForm.controls.darkModePreference.setValue(res.darkModePreference);
        this.userForm.controls.currencyCode.setValue(res.currencyCode);
      }
      this.isLoading = false;
    },
    (err) =>{
      this.isLoading = false;
    })
  }

  onSubmit() {
    let form = this.userForm.value;
    let command = new UpdateUserCommand();
    let model = new UpdateUserDto();
    model.name = form.name;
    model.defaultTheme = form.defaultTheme;
    model.darkModePreference = form.darkModePreference;
    model.currencyCode = form.currencyCode;

    command.model = model;
    this.userClient.updateUser(command).subscribe(res => {
      this.formSubmitted.emit(true);
      if(this.userForm.controls.darkModePreference.dirty){
        window.location.reload();
      }
      if(this.userForm.controls.defaultTheme.dirty){
        this.themeService.setCurrentTheme(model.defaultTheme);
      }
      this.getUser(true);
      this.snackBar.open('Data Saved!', 'Close', {
        duration: 5000,
      });
    },
    (err) => {
      this.snackBar.open('Error saving data!', 'Close', {
        duration: 5000,
      });
    })
  }
}
