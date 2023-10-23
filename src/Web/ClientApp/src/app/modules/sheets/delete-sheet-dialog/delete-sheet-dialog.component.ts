import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SheetItem, SheetItemEntryType, SheetItemCategory, SheetsClient, UpsertSheetItemCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-delete-sheet-dialog',
  templateUrl: './delete-sheet-dialog.component.html',
  styleUrls: ['./delete-sheet-dialog.component.css']
})
export class DeleteSheetDialogComponent {
  year: number;
  month: { name: string; number: number };

  deletionText: string;
  isDeleting = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteSheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sheetClient: SheetsClient,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.year = data.year;
      this.month = data.month;
    }
  }

  delete() {
    this.isDeleting = true;
    this.sheetClient.deleteSheet(this.year, this.month.number).subscribe(res => {
      if(res){
        this.snackBar.open('Deleted Successfully!', 'Close', {
          duration: 5000,
        }); 
        this.dialogRef.close(true)
      }
    })
  }
  getDeletionText(): string{
    return `${this.month.name} ${this.year}`;
  }
}
