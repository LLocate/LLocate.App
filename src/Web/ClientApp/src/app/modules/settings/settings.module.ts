import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsUserPreferenceComponent } from './settings-user-preference/settings-user-preference.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRouting } from './settings.routing';



@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    SettingsRouting,
    SharedModule,
    FormsModule,
    CommonModule,
    SettingsUserPreferenceComponent
  ]
})
export class SettingsModule { }
