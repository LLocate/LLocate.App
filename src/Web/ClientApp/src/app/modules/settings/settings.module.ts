import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsUserPreferenceComponent } from './settings-user-preference/settings-user-preference.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SettingsComponent,
    SettingsUserPreferenceComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule
  ],
  exports:[
    SettingsUserPreferenceComponent
  ]
})
export class SettingsModule { }
