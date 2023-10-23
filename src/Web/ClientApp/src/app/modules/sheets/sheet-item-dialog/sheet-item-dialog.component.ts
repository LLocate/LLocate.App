import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetItem, SheetItemEntryType, SheetItemCategory, SheetsClient, UpsertSheetItemCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-sheet-item-dialog',
  templateUrl: './sheet-item-dialog.component.html',
  styleUrls: ['./sheet-item-dialog.component.css']
})
export class SheetItemDialogComponent {
  model: SheetItem = new SheetItem();
  sheetItemEntryType = SheetItemEntryType;
  sheetItemCategory = SheetItemCategory;

  isUpdating = false;

  constructor(
    public dialogRef: MatDialogRef<SheetItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SheetItem,
    private sheetClient: SheetsClient,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.model = data;
    }
  }

  upsert() {
    this.isUpdating = true;
    let command = new UpsertSheetItemCommand();
    command.model = this.model;
    this.sheetClient.upsertSheetItem(command).subscribe(res => {
      if(res){
        this.snackBar.open('Updated Successfully!', 'Close', {
          duration: 5000,
        }); 
        this.dialogRef.close(true)
      }
    })
  }
}
