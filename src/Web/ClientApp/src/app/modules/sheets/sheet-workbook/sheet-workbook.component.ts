import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entry, EntryType, GenerateSheetCommand, GetSheetDto, Sheet, SheetItem, SheetItemCategory, SheetItemEntryType, SheetsClient } from 'src/app/web-api-client';
import { GoalEntryDialogComponent } from '../../goals/goal-entry-dialog/goal-entry-dialog.component';
import { MatSelect } from '@angular/material/select';
import { Globals } from 'src/app/services/globals';
import { SheetItemDialogComponent } from '../sheet-item-dialog/sheet-item-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatAccordion } from '@angular/material/expansion';
import { DeleteSheetDialogComponent } from '../delete-sheet-dialog/delete-sheet-dialog.component';

@Component({
  selector: 'app-sheet-workbook',
  templateUrl: './sheet-workbook.component.html',
  styleUrls: ['./sheet-workbook.component.css']
})
export class SheetWorkbookComponent implements AfterViewInit {
  years = [];
  months: { name: string; number: number }[] = [
    { name: 'January', number: 1 },
    { name: 'February', number: 2 },
    { name: 'March', number: 3 },
    { name: 'April', number: 4 },
    { name: 'May', number: 5 },
    { name: 'June', number: 6 },
    { name: 'July', number: 7 },
    { name: 'August', number: 8 },
    { name: 'September', number: 9 },
    { name: 'October', number: 10 },
    { name: 'November', number: 11 },
    { name: 'December', number: 12 },
  ];
  currentMonthWithName: { name: string; number: number };
  minYearMonth: { year: number; month: number }
  maxYearMonth: { year: number; month: number }


  currentYear: number;
  currentMonth: number;
  currentMonthDate: Date;

  model: GetSheetDto = new GetSheetDto();
  sheetItemEntryType = SheetItemEntryType;
  sheetItemCategory = SheetItemCategory;
  isLoading = true;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  constructor(
    private sheetClient: SheetsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ) {
    _global.setTitle("Workbook");
    this.years = this.generateArrayOfYears();
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1; // Months are zero-based (0 for January).
    this.currentMonthWithName = this.months.filter(x => x.number == this.currentMonth)[0];
    this.currentMonthDate = new Date(2000, currentDate.getMonth(), 2);
  }

  ngAfterViewInit(): void {
    this.getSheet();
  }

  nextMonth() {
    if (this.maxYearMonth.month == this.currentMonth && this.maxYearMonth.year == this.currentYear) return;
    if (this.currentMonth == 12) {
      this.currentMonth = 1;
      this.currentYear += 1;
      this.monthChanged(this.currentMonth);
    }
    else {
      this.currentMonth += 1;
      this.monthChanged(this.currentMonth);
    }
  }

  previousMonth() {
    if (this.minYearMonth.month == this.currentMonth && this.minYearMonth.year == this.currentYear) return;
    if (this.currentMonth == 1) {
      this.currentMonth = 12;
      this.currentYear -= 1;
      this.monthChanged(this.currentMonth);
    }
    else {
      this.currentMonth -= 1;
      this.monthChanged(this.currentMonth);
    }
  }

  yearChanged(year) {
    this.currentYear = year;
    this.getSheet();
  }
  monthChanged(month) {
    this.currentMonthWithName = this.months.filter(x => x.number == month)[0];
    this.currentMonth = month;
    this.getSheet();
  }

  getSheet() {
    this.isLoading = true;
    this.sheetClient.getSheet(this.currentYear, this.currentMonth).subscribe(res => {
      this.model = res;
      this.isLoading = false;
    })
  }
  generateSheet() {
    this.isLoading = true;
    let command = new GenerateSheetCommand();
    command.year = this.currentYear;
    command.month = this.currentMonth;
    this.sheetClient.generateSheet(command).subscribe(res => {
      if (res) {
        this.getSheet();
      }
    })
  }

  openEntryDialog(data: Entry = undefined): void {
    const dialogRef = this.dialog.open(GoalEntryDialogComponent, {
      data: {
        data,
        sheet: this.model.sheet
      },
    });
  }

  openSheetItemDialog(data: SheetItem = undefined): void {
    if (!data) {
      data = new SheetItem();
      data.allocated = 0;
      data.entryType = SheetItemEntryType.Payment;
      data.month = this.currentMonth;
      data.year = this.currentYear;
    }
    const dialogRef = this.dialog.open(SheetItemDialogComponent, {
      data: data,
      
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.getSheet();
    });
  }

  deleteSheetDialog(){
    const dialogRef = this.dialog.open(DeleteSheetDialogComponent, {
      data: {
        month: this.currentMonthWithName,
        year: this.currentYear
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.getSheet();
    });
  }


  generateArrayOfYears(): Number[] {
    let startYear = 2023;
    var max = new Date().getFullYear() + 1;
    var min = startYear;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }

    this.minYearMonth = { year: startYear, month: 1 }
    this.maxYearMonth = { year: max, month: 12 }
    return years;
  }
}
