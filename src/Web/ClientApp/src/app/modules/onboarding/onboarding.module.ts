import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { OnbnoardingRouting } from './onboarding.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsModule } from '../settings/settings.module';
import { OnboardingStepperComponent } from './onboarding-stepper/onboarding-stepper.component';



@NgModule({
  declarations: [
    OnboardingComponent,
    OnboardingStepperComponent
  ],
  imports: [
    OnbnoardingRouting,
    CommonModule,
    SharedModule,
    FormsModule,
    SettingsModule
  ]
})
export class OnboardingModule { }
