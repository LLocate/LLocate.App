import { RouterModule, Routes } from "@angular/router";
import { GoalsComponent } from "./goals.component";
import { GoalSummaryComponent } from "./goal-summary/goal-summary.component";
import { GoalSettingTableComponent } from "./goal-setting-table/goal-setting-table.component";
import { GoalEntryTableComponent } from "./goal-entry-table/goal-entry-table.component";

export const routes: Routes = [
    {
        path: '',
        component: GoalsComponent,
        // canActivate: [UserDefaultRoute],
        children: [
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'full'
            },
            {
                path: 'summary',
                component: GoalSummaryComponent
            },
            {
                path: 'transactions',
                component: GoalEntryTableComponent
            },
            {
                path: 'setting',
                component: GoalSettingTableComponent
            },
        ]
    },
];
export const GoalsRouting = RouterModule.forChild(routes);