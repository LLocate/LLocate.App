import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entry, EntryType, Goal, GoalSummaryDto, GoalsClient } from 'src/app/web-api-client';
import { GoalEntryDialogComponent } from '../goal-entry-dialog/goal-entry-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-goal-entry-table',
  templateUrl: './goal-entry-table.component.html',
  styleUrls: ['./goal-entry-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GoalEntryTableComponent {
  dataSource: Entry[] = [];
  displayedColumns: string[] = [
    'position',
    'txnDate',
    'type',
    'name',
    'amount',
    'action'
  ];
  columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
  
  displayedColumnsM: string[] = [
    'mobile',
    // 'action'
  ];
  columnsToDisplayWithExpandM = [  ...this.displayedColumnsM];

  entryType = EntryType;
  expandedElement: Entry | null;
  isLoading = true;

  constructor(
    private goalsClient: GoalsClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public _global: Globals
  ) {
    _global.setTitle("Goal Transactions");
    this.getEntries();
  }

  getEntries() {
    this.isLoading = true;
    this.goalsClient.getEntries().subscribe(res => {
      this.dataSource = res;
      this.isLoading = false;
    })
  }

  newDeposit() {
    let data = new Entry();
    data.type = this.entryType.Deposit;
    data.transactionDate = new Date();
    data.amount = 0;
    this.openEntryDialog(data);
  }

  newWithdrawal() {
    let data = new Entry();
    data.type = this.entryType.Withdraw;
    data.transactionDate = new Date();
    data.amount = 0;
    this.openEntryDialog(data);
  }


  openEntryDialog(data: Entry = undefined): void {
    const dialogRef = this.dialog.open(GoalEntryDialogComponent, {
      data: {data},
      
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.getEntries();
    });
  }

  log(item) {
    console.log(item);
  }
}
