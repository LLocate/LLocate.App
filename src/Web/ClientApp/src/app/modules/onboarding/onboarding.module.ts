import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { OnbnoardingRouting } from './onboarding.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    OnbnoardingRouting
  ]
})
export class OnboardingModule { }
