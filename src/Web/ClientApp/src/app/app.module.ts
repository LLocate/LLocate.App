import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SharedProviderModule } from './shared/shared-provider.module';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { PortalFooterComponent } from './portal-layout/portal-footer/portal-footer.component';
import { ThemeToggleComponent } from './portal-layout/theme-toggle/theme-toggle.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotFoundComponent } from './portal-layout/not-found/not-found.component';
import { PortalIndexComponent } from './portal-layout/portal-index/portal-index.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PortalLayoutComponent,
    PortalFooterComponent,
    PortalIndexComponent,
    NotFoundComponent,
    ThemeToggleComponent
  ],
  imports: [
    SharedModule,
    SharedProviderModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
