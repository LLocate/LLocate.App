import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { OnbnoardingRouting } from './onboarding.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsModule } from '../settings/settings.module';
import { SettingsUserPreferenceComponent } from '../settings/settings-user-preference/settings-user-preference.component';

@NgModule({
  declarations: [
    OnboardingComponent,
  ],
  imports: [
    OnbnoardingRouting,
    CommonModule,
    SharedModule,
    FormsModule,
    SettingsUserPreferenceComponent
  ]
})
export class OnboardingModule { }
