import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { Goal, GoalType } from 'src/app/web-api-client';

@Component({
  selector: 'app-goal-detail-dialog',
  templateUrl: './goal-detail-dialog.component.html',
  styleUrls: ['./goal-detail-dialog.component.css'],
})
export class GoalDetailDialogComponent {
  model: Goal = new Goal();
  goalType = GoalType;

  constructor(
    public dialogRef: MatDialogRef<GoalDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Goal,
  ) {
    if(data){
      this.model = data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void{
    if(this.model.type == this.goalType.Progressive){
      this.model.targetDate = null;
      this.model.startDate = null;
    }
    this.dialogRef.close(this.model);
  }
}
