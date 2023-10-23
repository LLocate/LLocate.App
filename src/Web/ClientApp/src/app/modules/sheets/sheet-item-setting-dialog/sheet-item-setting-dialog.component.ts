import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetItemCategory, SheetItemEntryType, SheetItemSetting, SheetsClient, UpsertSheetItemSettingCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-sheet-item-setting-dialog',
  templateUrl: './sheet-item-setting-dialog.component.html',
  styleUrls: ['./sheet-item-setting-dialog.component.css']
})
export class SheetItemSettingDialogComponent {
  model: SheetItemSetting = new SheetItemSetting();
  sheetItemEntryType = SheetItemEntryType;
  sheetItemCategory = SheetItemCategory;

  isUpdating = false;

  constructor(
    public dialogRef: MatDialogRef<SheetItemSettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SheetItemSetting,
    private sheetClient: SheetsClient,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.model = data;
    }
  }

  upsert() {
    this.isUpdating = true;
    let command = new UpsertSheetItemSettingCommand();
    command.model = this.model;
    this.sheetClient.upsertSheetItemSetting(command).subscribe(res => {
      if(res){
        this.snackBar.open('Updated Successfully!', 'Close', {
          duration: 5000,
        }); 
        console.log('true');
        this.dialogRef.close(true);
      }
    })
  }
}
