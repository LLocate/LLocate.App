import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LottieAnimationComponent } from 'src/app/shared/components/lottie-animation/lottie-animation.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRouting,
    SharedModule,
    FormsModule,
    CommonModule,
    LottieAnimationComponent
  ]
})
export class DashboardModule { }
