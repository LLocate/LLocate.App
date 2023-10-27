import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";

export const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
    },
];
export const SettingsRouting = RouterModule.forChild(routes);