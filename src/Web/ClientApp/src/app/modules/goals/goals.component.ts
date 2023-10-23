import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoalDetailDialogComponent } from './goal-detail-dialog/goal-detail-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoalDistributionPercentageDialogComponent } from './goal-distribution-percentage-dialog/goal-distribution-percentage-dialog.component';
import { Goal, GoalType, GoalsClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  dataSource : Goal[] = [];
  displayedColumns: string[] = ['position', 'type', 'name', 'description', 'startDate', 'targetDate', 'amount', 'percentage' , 'action'];
  goalType = GoalType;

  constructor(
    private goalsClient: GoalsClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

}
