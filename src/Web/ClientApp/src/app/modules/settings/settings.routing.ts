import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { SettingsUserPreferenceComponent } from "./settings-user-preference/settings-user-preference.component";

export const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        // canActivate: [UserDefaultRoute],
        children: [
            {
                path: '',
                component: SettingsUserPreferenceComponent
            },
            {
                path: 'general',
                component: SettingsUserPreferenceComponent
            }
        ]
    },
];
export const SettingsRouting = RouterModule.forChild(routes);