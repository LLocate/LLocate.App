import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetItem, SheetItemCategory, SheetItemEntry, SheetItemEntryType, SheetsClient, UpsertSheetItemEntryCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-sheet-item-entry-dialog',
  templateUrl: './sheet-item-entry-dialog.component.html',
  styleUrls: ['./sheet-item-entry-dialog.component.css']
})
export class SheetItemEntryDialogComponent {
  sheetItem: SheetItem = new SheetItem();
  sheetItemEntry: SheetItemEntry = new SheetItemEntry();
  sheetItemEntryType = SheetItemEntryType;
  sheetItemCategory = SheetItemCategory;
  markAsComplete = false;

  isUpdating = false;

  constructor(
    public dialogRef: MatDialogRef<SheetItemEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      sheetItem: SheetItem,
      sheetItemEntry: SheetItemEntry
      isComplete: boolean
    },
    private sheetClient: SheetsClient,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.sheetItemEntry = data.sheetItemEntry;
      this.sheetItem = data.sheetItem;
      this.markAsComplete = data.isComplete;
    }
  }

  upsert() {
    this.isUpdating = true;
    let command = new UpsertSheetItemEntryCommand();
    command.model = this.sheetItemEntry;
    command.isSheetItemCompleted = this.markAsComplete;
    this.sheetClient.upsertSheetItemEntry(command).subscribe(res => {
      if(res){
        this.snackBar.open('Updated Successfully!', 'Close', {
          duration: 5000,
        }); 
        this.dialogRef.close(true)
      }
    })
  }
}
