import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Globals } from 'src/app/services/globals';
import { SetCompleteOnboardingCommand, UsersClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  
  constructor(private _formBuilder: FormBuilder, public _global:Globals, private usersClient: UsersClient) {
    _global.setTitle("Onboarding");
  }

  completeOnboarding(){
    let command: SetCompleteOnboardingCommand = new SetCompleteOnboardingCommand();
    command.isCompleted = true;
    this.usersClient.setCompleteOnboarding(command).subscribe(res => {
      this._global.user.isCompleteOnboarding = res;
      this
    })
  }
}
