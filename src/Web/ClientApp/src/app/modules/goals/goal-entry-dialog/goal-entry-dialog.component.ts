import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entry, EntryType, Goal, GoalEntry, GoalSummaryDto, GoalSummaryItemDto, GoalType, GoalsClient, Sheet, UpdateGoalDistributionCommand, UpsertEntryCommand } from 'src/app/web-api-client';
import { GoalDistributionPercentageDialogComponent } from '../goal-distribution-percentage-dialog/goal-distribution-percentage-dialog.component';
import { DecimalPipe } from '@angular/common';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-goal-entry-dialog',
  templateUrl: './goal-entry-dialog.component.html',
  styleUrls: ['./goal-entry-dialog.component.css']
})
export class GoalEntryDialogComponent {
  entry: Entry = new Entry();
  entryType = EntryType;
  goalType = GoalType;
  loading = true;
  isUpdating = false;
  selectedWithdrawGoalItem: number;
  goalSummary: GoalSummaryDto = new GoalSummaryDto();
  goalEntries: GoalEntry[] = [];

  sheet: Sheet;

  constructor(
    public dialogRef: MatDialogRef<GoalEntryDialogComponent>,
    public _global: Globals,
    private goalClient: GoalsClient,
    private snackBar: MatSnackBar,
    private decimalPipe: DecimalPipe,
    @Inject(MAT_DIALOG_DATA) public data: {
      data: Entry,
      sheet: Sheet
    },
  ) {
    this.entry = data.data;
    this.sheet = data.sheet;
    console.log(this.sheet)
    if (this.entry.id > 0 && this.entry.type == EntryType.Withdraw) {
      this.selectedWithdrawGoalItem = this.entry.goalEntries[0].goalId
    }
  }

  ngOnInit(): void {
    this.getGoalSummary();
    this.getValidGoals();
  }

  getValidGoals() {
    this.goalClient.getValidGoals().subscribe(res => {
      res.forEach(x => {
        let goalEntry = new GoalEntry();
        goalEntry.goal = x;
        goalEntry.goalId = x.id;
        this.goalEntries.push(goalEntry);
      });
      this.distribute();

      this.loading = false;
    })
  }

  getGoalSummary() {
    this.goalClient.getGoalSummary().subscribe(res => {
      this.goalSummary = res;
    })
  }

  update(): void {
    this.isUpdating = true;

    let command = new UpsertEntryCommand();
    command.sheet = this.sheet;
    if (this.entry.id) {
      command.model = this.entry;
      console.log(command);
      this.goalClient.upsertEntry(command).subscribe(res => {
        if (res) {
          this.snackBar.open('Update Successful!', 'Close', {
            duration: 5000,
          });
          this.dialogRef.close(true);
        }
      })
    }
    else {
      if (this.entry.type == EntryType.Withdraw) {
        let goalEntry = new GoalEntry();
        goalEntry.goalId = this.selectedWithdrawGoalItem;
        goalEntry.amount = this.entry.amount;
        command.goalEntries = [goalEntry];
      }
      else {
        let goalEntriesToCreate = [];
        this.goalEntries.forEach(element => {
          if (element.amount > 0) {
            goalEntriesToCreate.push(element);
          }
        });
        command.goalEntries = goalEntriesToCreate;
      }
      command.model = this.entry;
      this.goalClient.upsertEntry(command).subscribe(res => {
        if (res) {
          this.snackBar.open('Create Successful!', 'Close', {
            duration: 5000,
          });
          this.dialogRef.close(true);
        }
      })
    }
  }

  distribute() {
    this.goalEntries.forEach(x => {
      let amount = (x.goal.defaultContributionPercentage / 100) * this.entry.amount;
      x.amount = parseFloat(amount.toFixed(2));
    })
  }

  getRemaining(): number {
    let sum = 0;
    this.goalEntries.forEach(x => {
      sum += x.amount;
    })
    let remaining = this.entry.amount - sum;
    return parseFloat(remaining.toFixed(2));
  }
}
