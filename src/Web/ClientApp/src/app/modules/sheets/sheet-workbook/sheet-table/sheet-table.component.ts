import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenerateSheetCommand, GetSheetDto, Sheet, SheetItem, SheetItemCategory, SheetItemEntry, SheetItemEntryType, SheetsClient } from 'src/app/web-api-client';
import { SheetItemEntryDialogComponent } from '../../sheet-item-entry-dialog/sheet-item-entry-dialog.component';
import { SheetItemDialogComponent } from '../../sheet-item-dialog/sheet-item-dialog.component';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-sheet-table',
  templateUrl: './sheet-table.component.html',
  styleUrls: ['./sheet-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SheetTableComponent {
  @Input() month: number;
  @Input() year: number;
  @Input() title: string;
  @Input() dataSource: SheetItem[];
  @Output() refreshSheet = new EventEmitter<any>();

  sheetItemEntryType = SheetItemEntryType;
  sheetItemCategory = SheetItemCategory;

  displayedColumns: string[] = [
    'position',
    // 'type',
    'name',
    'allocated',
    'fulfilled',
    'balance',
    'action'
  ];
  columnsToDisplayWithExpand = [ 'expand', ...this.displayedColumns];
  
  displayedColumnsM: string[] = [
    'mobile',
    'action'
  ];
  columnsToDisplayWithExpandM = [  ...this.displayedColumnsM];

  expandedElement: SheetItem | null;


  constructor(
    private sheetClient: SheetsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ){
  }
  
  openSheetItemDialog(data: SheetItem = undefined): void {
    if(!data){
      data = new SheetItem();
      data.allocated = 0;
      data.entryType = SheetItemEntryType.Payment;
      data.month = this.month;
      data.year = this.year;
    } 
    const dialogRef = this.dialog.open(SheetItemDialogComponent, {
      data: data,
      
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.refreshSheet.emit(true);
    });
  }
  
  openSheetItemEntryDialog(sheetItem: SheetItem, entry: SheetItemEntry = undefined): void {
    if(!entry){
      entry = new SheetItemEntry();
      entry.sheetItemId = sheetItem.id
      entry.amount = sheetItem.allocated - sheetItem.fulfilled;
      entry.description = 'completed';
      entry.transactionDate = new Date();
    } 
    const dialogRef = this.dialog.open(SheetItemEntryDialogComponent, {
      data: {
        sheetItem: sheetItem,
        sheetItemEntry: entry,
        isComplete: true
      },
      
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.refreshSheet.emit(true);
    });
  }
  
  openPartialSheetItemEntryDialog(sheetItem: SheetItem, entry: SheetItemEntry = undefined): void {
    if(!entry){
      entry = new SheetItemEntry();
      entry.sheetItemId = sheetItem.id
      entry.amount = 0;
      entry.transactionDate = new Date();
    } 
    const dialogRef = this.dialog.open(SheetItemEntryDialogComponent, {
      data: {
        sheetItem: sheetItem,
        sheetItemEntry: entry
      },
      
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.refreshSheet.emit(true);
    });
  }
}
