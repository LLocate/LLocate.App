import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsRouting } from './goals.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoalDetailDialogComponent } from './goal-detail-dialog/goal-detail-dialog.component';
import { GoalDistributionPercentageDialogComponent } from './goal-distribution-percentage-dialog/goal-distribution-percentage-dialog.component';
import { GoalEntryDialogComponent } from './goal-entry-dialog/goal-entry-dialog.component';
import { GoalEntryTableComponent } from './goal-entry-table/goal-entry-table.component';
import { GoalSettingTableComponent } from './goal-setting-table/goal-setting-table.component';
import { GoalSummaryComponent } from './goal-summary/goal-summary.component';
import { GoalsComponent } from './goals.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GoalsComponent,
    GoalDetailDialogComponent,
    GoalDistributionPercentageDialogComponent,
    GoalSettingTableComponent,
    GoalEntryTableComponent,
    GoalSummaryComponent,
    GoalEntryDialogComponent,
  ],
  imports: [
    GoalsRouting,
    SharedModule,
    FormsModule,
    CommonModule
  ]
})
export class GoalsModule { }
