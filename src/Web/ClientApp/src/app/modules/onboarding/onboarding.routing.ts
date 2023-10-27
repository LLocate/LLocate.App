import { RouterModule, Routes } from "@angular/router";
import { OnboardingComponent } from "./onboarding.component";
import { OnboardingStepperComponent } from "./onboarding-stepper/onboarding-stepper.component";

export const routes: Routes = [
    {
        path: '',
        component: OnboardingComponent,
        children: [
            {
                path: '',
                redirectTo: 'start',
                pathMatch: 'full'
            },
            {
                path: 'start',
                component: OnboardingStepperComponent
            }
        ]
    },
];
export const OnbnoardingRouting = RouterModule.forChild(routes);