import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoalEntryDialogComponent } from 'src/app/modules/goals/goal-entry-dialog/goal-entry-dialog.component';
import { Globals } from 'src/app/services/globals';
import { ChartsClient, Entry, EntryType, GetSheetDto, Sheet, SheetsClient, SingleChartDto } from 'src/app/web-api-client';

@Component({
  selector: 'app-sheet-summary',
  templateUrl: './sheet-summary.component.html',
  styleUrls: ['./sheet-summary.component.css']
})
export class SheetSummaryComponent implements AfterViewInit{
  @Input() model: GetSheetDto;
  @Output() refreshSheet = new EventEmitter<any>();

  chartLoading = true;
  dataSource: SingleChartDto[];

  overUtilized: { name: string; amount: number }[] = [];
  overTotal = 0;
  underUtilizedDescription = "Any completed item that are less than fulfilled amount will be displayed here";

  underUtilized: { name: string; amount: number }[] = [];
  underTotal = 0;
  overUtilizedDescription = "Any completed item that are more than fulfilled amount will be displayed here";

  constructor(
    private chartsClient: ChartsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ) {
  }
  ngAfterViewInit(): void {
    this.loadChart();
    this.loadData();
  }
  
  loadData(){
    let completedItems = this.model.payments.filter(x => x.isCompleted);
    for(let completed of completedItems){
      if(completed.allocated > completed.fulfilled){
        let item : { name: string; amount: number } = { name: completed.name, amount: completed.allocated - completed.fulfilled };
        this.underUtilized.push(item);
        this.underTotal += item.amount;
      }
      else if(completed.fulfilled > completed.allocated){
        let item : { name: string; amount: number } = { name: completed.name, amount: completed.fulfilled - completed.allocated };
        this.overUtilized.push(item);
        this.overTotal += item.amount;
      }
    }
  }

  loadChart(){
    this.chartLoading = true;
    this.chartsClient.getExpensesAllocationChart(this.model.sheet.year, this.model.sheet.month).subscribe(res =>{
      this.dataSource = res;
      this.chartLoading = false;
    })
  }

  newDeposit(amount: number) {
    let data = new Entry();
    data.type = EntryType.Deposit;
    data.name = `Contribution from ${this.model.sheet.month}/${this.model.sheet.year}`;
    data.transactionDate = new Date();
    data.amount = parseFloat(amount.toFixed(2));
    this.openEntryDialog(data);
  }

  openEntryDialog(data: Entry = undefined): void {
    const dialogRef = this.dialog.open(GoalEntryDialogComponent, {
      data: {
        data,
        sheet: this.model.sheet
      },
    });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.refreshSheet.emit(true);
    });
  }

}
