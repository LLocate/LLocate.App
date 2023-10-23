import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Goal, SheetItemCategory, SheetItemEntryType, SheetItemSetting, SheetSetting, SheetsClient, UpsertGoalCommand } from 'src/app/web-api-client';
import { SheetItemSettingDialogComponent } from '../sheet-item-setting-dialog/sheet-item-setting-dialog.component';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-sheet-setting',
  templateUrl: './sheet-setting.component.html',
  styleUrls: ['./sheet-setting.component.css']
})
export class SheetSettingComponent {
  sheetSetting: SheetSetting;

  dataSourceI: SheetItemSetting[] = [];
  isLoadingI = true;

  dataSourceNI: SheetItemSetting[] = [];
  isLoadingNI = true;

  constructor(
    private sheetClient: SheetsClient,
    public dialog: MatDialog,
    public _global: Globals,
    private snackBar: MatSnackBar
  ) {
    _global.setTitle("Sheet Settings");
    this.getSheetSetting();

  }

  getSheetSetting() {
    this.sheetClient.getSheetSetting().subscribe(res => {
      this.sheetSetting = res;
    })
    
    this.getNonInstallmentAllSheetItemSettings();
    this.getInstallmentAllSheetItemSettings();
  }

  
  getNonInstallmentAllSheetItemSettings(){
    this.isLoadingNI = true;
    this.sheetClient.getAllSheetItemSettings(false).subscribe(res =>{
      this.dataSourceNI = res;
      this.isLoadingNI = false;
    })
  }

  getInstallmentAllSheetItemSettings() {
    this.isLoadingI = true;
    this.sheetClient.getAllSheetItemSettings(true).subscribe(res => {
      this.dataSourceI = res;
      this.isLoadingI = false;
    })
  }

  openSheetItemSettingDialog(isInstallment: boolean = false): void {
    let data = new SheetItemSetting();
    data.allocated = 0;
    data.isInstallment = isInstallment;
    data.entryType = SheetItemEntryType.Payment;
    const dialogRef = this.dialog.open(SheetItemSettingDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.getSheetSetting();
      }
    });
  }

}
