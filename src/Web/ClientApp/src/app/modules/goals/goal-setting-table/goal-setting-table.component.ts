import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Goal, GoalType, GoalsClient, UpsertGoalCommand } from 'src/app/web-api-client';
import { GoalDetailDialogComponent } from '../goal-detail-dialog/goal-detail-dialog.component';
import { GoalDistributionPercentageDialogComponent } from '../goal-distribution-percentage-dialog/goal-distribution-percentage-dialog.component';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-goal-setting-table',
  templateUrl: './goal-setting-table.component.html',
  styleUrls: ['./goal-setting-table.component.css']
})
export class GoalSettingTableComponent {
  dataSource : Goal[] = [];
  displayedColumns: string[] = ['position', 'type', 'name', 'description', 'startDate', 'targetDate', 'amount', 'percentage' , 'action'];
  displayedColumnsM: string[] = ['mobile', 'action'];
  goalType = GoalType;
  isLoading = true;

  constructor(
    private goalsClient: GoalsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ) {
    _global.setTitle("Goal Settings");
    this.getGoals();
  }

  getGoals(){
    this.isLoading = true;
    this.goalsClient.getAllGoals().subscribe(res =>{
      this.dataSource = res;
      this.isLoading = false;
    })
  }

  openGoalDialog(data: Goal = undefined): void {
    const dialogRef = this.dialog.open(GoalDetailDialogComponent, {
      data: data,
      
    });

    dialogRef.afterClosed().subscribe((result: Goal) => {
      if(result){
        console.log(result);
        let command = new UpsertGoalCommand();
        command.model = result;
        this.goalsClient.upsertGoal(command).subscribe(res =>{
          this.getGoals();
          this.snackBar.open('Goal Updated!', 'Close', {
            duration: 5000,
          });
        });
      }
    });
  }

  openDistributionDialog(data: Goal = undefined): void {
    const dialogRef = this.dialog.open(GoalDistributionPercentageDialogComponent, {
      
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result)
        this.getGoals();
    });
  }

  upsertGoals(goal: Goal){
    let command = new UpsertGoalCommand();
    command.model = goal;
    this.goalsClient.upsertGoal(command).subscribe(res => {
      this.getGoals();
    })
  }
}
