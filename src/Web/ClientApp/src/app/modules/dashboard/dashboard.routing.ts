import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        // canActivate: [UserDefaultRoute],
        children: [
            // {
            //     path: '',
            //     redirectTo: 'summary',
            //     pathMatch: 'full'
            // },
        ]
    },
];
export const DashboardRouting = RouterModule.forChild(routes);