import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Goal, GoalType, GoalsClient, UpdateGoalDistributionCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-goal-distribution-percentage-dialog',
  templateUrl: './goal-distribution-percentage-dialog.component.html',
  styleUrls: ['./goal-distribution-percentage-dialog.component.css']
})
export class GoalDistributionPercentageDialogComponent implements OnInit {
  models: Goal[] = [];
  goalType = GoalType;
  loading = true;
  isUpdating = false;


  constructor(
    public dialogRef: MatDialogRef<GoalDistributionPercentageDialogComponent>,
    private goalClient: GoalsClient,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.goalClient.getValidGoals().subscribe(res => {
      this.models = res;
      this.loading = false;
    })
  }

  update(): void {
    this.isUpdating = true;
    
    let command = new UpdateGoalDistributionCommand();
    command.models = this.models;
    this.goalClient.updateGoalDistribution(command).subscribe(res =>{
      if(res){
        this.snackBar.open('Distribution Successful!', 'Close', {
          duration: 5000,
        });
        this.dialogRef.close(true);
      }
    })
  }

  availablePercentage(): number {
    let sum: number = 0;
    this.models.forEach(a => sum += a.defaultContributionPercentage);
    return 100 - sum;
  }
}
