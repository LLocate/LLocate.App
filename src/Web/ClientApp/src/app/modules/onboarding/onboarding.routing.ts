import { RouterModule, Routes } from "@angular/router";
import { OnboardingComponent } from "./onboarding.component";

export const routes: Routes = [
    {
        path: '',
        component: OnboardingComponent,
    },
];
export const OnbnoardingRouting = RouterModule.forChild(routes);