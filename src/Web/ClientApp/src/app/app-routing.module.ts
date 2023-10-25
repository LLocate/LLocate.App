import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PortalLayoutComponent } from "./portal-layout/portal-layout.component";
import { NotFoundComponent } from "./portal-layout/not-found/not-found.component";
import { PortalIndexComponent } from "./portal-layout/portal-index/portal-index.component";
import { AuthGuard } from "./services/auth.guard";

export const routes: Routes = [
  // {
  //   path: '',
  //   component: PortalIndexComponent
  // },
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "full"
      },
      {
        path: 'sheets',
        loadChildren: () => import(`./modules/sheets/sheets.module`).then(m => m.SheetsModule),
      },
      {
        path: 'goals',
        loadChildren: () => import(`./modules/goals/goals.module`).then(m => m.GoalsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'onboarding',
        loadChildren: () => import(`./modules/onboarding/onboarding.module`).then(m => m.OnboardingModule),
      },
      {
        path: 'settings',
        loadChildren: () => import(`./modules/settings/settings.module`).then(m => m.SettingsModule),
      },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
    ],
    // canActivate: [AuthGuard]
  }
  // { path: 'token', component: TokenComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
