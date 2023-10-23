import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Globals } from 'src/app/services/globals';
import { GoalSummaryDto, GoalSummaryItemDto, GoalType, GoalsClient } from 'src/app/web-api-client';

@Component({
  selector: 'app-goal-summary',
  templateUrl: './goal-summary.component.html',
  styleUrls: ['./goal-summary.component.css']
})
export class GoalSummaryComponent {
  data : GoalSummaryDto = new GoalSummaryDto();
  displayedColumns: string[] = ['position', 'type', 'name', 'startDate', 'targetDate', 'targetAmount', 'accumulated', 'utilized', 'available',
  //  'action'
  ];
  displayedColumnsM: string[] = ['mobile'];

  goalType = GoalType;
  isLoading = true;

  constructor(
    private goalsClient: GoalsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar    
  ) {
    _global.setTitle("Goal Summary");
    this.getGoalSummary();
  }

  getGoalSummary(){
    this.isLoading = true;
    this.goalsClient.getGoalSummary().subscribe(res =>{
      this.data = res;
      this.isLoading = false;
    })
  }

}
