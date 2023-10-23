import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoalEntryDialogComponent } from 'src/app/modules/goals/goal-entry-dialog/goal-entry-dialog.component';
import { Globals } from 'src/app/services/globals';
import { GetSheetDto, SingleChartDto, ChartsClient, Entry, EntryType, SheetItemSetting, SheetItemCategory, SheetItemEntryType } from 'src/app/web-api-client';

@Component({
  selector: 'app-sheet-setting-summary',
  templateUrl: './sheet-setting-summary.component.html',
  styleUrls: ['./sheet-setting-summary.component.css']
})
export class SheetSettingSummaryComponent {
  @Input() installment: SheetItemSetting[];
  @Input() nonInstallment: SheetItemSetting[];

  sheetItemCategory = SheetItemCategory;
  sheetItemCategoryValues = Object.values(SheetItemCategory);
  sheetItemEntryType = SheetItemEntryType;

  expensesChart: SingleChartDto[] = [];
  earningChart: SingleChartDto[] = [];
  installmentChart: SingleChartDto[] = [];

  expensesChartLoading = true;
  earningChartLoading = true;


  constructor(
    private chartsClient: ChartsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ) {
  }
  ngAfterViewInit(): void {
    this.generateChart();
  }

  generateChart() {
    this.expensesChartLoading = true;
    this.earningChartLoading = true;
    let expenses = this.nonInstallment.filter(x => x.entryType == SheetItemEntryType.Payment);
    for (const category in SheetItemCategory) {
      if (isNaN(Number(category))) {
        let categorized = expenses.filter(x => SheetItemCategory[x.category] == category);
        const sumOfAmounts = categorized.reduce((total, item) => total + item.allocated, 0);
        if(sumOfAmounts > 0)
          this.expensesChart.push(new SingleChartDto({ name: category, value: sumOfAmounts }));
      }
    }

    let earnings = this.nonInstallment.filter(x => x.entryType == SheetItemEntryType.Earning);
    for(let earning of earnings){
      this.earningChart.push(new SingleChartDto({ name: earning.name, value: earning.allocated }));
    }
    this.expensesChartLoading = false;
    this.earningChartLoading = false;

  }

}
