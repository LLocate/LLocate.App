import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetItemCategory, SheetItemEntryType, SheetItemSetting, SheetsClient } from 'src/app/web-api-client';
import { SheetItemSettingDialogComponent } from '../../sheet-item-setting-dialog/sheet-item-setting-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-sheet-setting-table',
  templateUrl: './sheet-setting-table.component.html',
  styleUrls: ['./sheet-setting-table.component.css']
})
export class SheetSettingTableComponent {
  @Input() isInstallment: boolean = false;
  @Input() dataSource: SheetItemSetting[] = [];
  displayedColumnsI: string[] = ['position', 'category', 'type', 'name', 'description', 'allocated', 'from', 'to', 'action'];
  displayedColumnsNI: string[] = ['position', 'category', 'type', 'name', 'description', 'allocated', 'action'];
  displayedColumnsM: string[] = ['mobile', 'action'];
  sheetItemEntryType = SheetItemEntryType;
  sheetItemCategory = SheetItemCategory;
  @Output() refreshSheet = new EventEmitter<any>();

  constructor(
    private sheetClient: SheetsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ) {
  }

  openSheetItemSettingDialog(data: SheetItemSetting = undefined): void {
    const dialogRef = this.dialog.open(SheetItemSettingDialogComponent, {
      data: data,

    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.refreshSheet.emit(true);
      }
    });
  }
}
