import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Globals } from 'src/app/services/globals';
import { SetCompleteOnboardingCommand, UsersClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  @ViewChild(MatStepper) stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, public _global: Globals, private router: Router, private usersClient: UsersClient) {
    _global.setTitle("Onboarding");
  }

  completeOnboarding() {
    let command: SetCompleteOnboardingCommand = new SetCompleteOnboardingCommand();
    command.isCompleted = true;
    this.usersClient.setCompleteOnboarding(command).subscribe(res => {
      this._global.user.isCompleteOnboarding = res;
      this.router.navigate(['/dashboard']);
    })
  }

  nextStep() {
    this.stepper.next();
  }
}
