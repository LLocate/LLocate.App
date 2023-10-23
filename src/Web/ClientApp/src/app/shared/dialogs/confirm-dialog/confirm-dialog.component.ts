import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  isHtmlContent: boolean;
  content: string;
  acceptButton: string;
  rejectButton: string;
  actionAlign: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title = "Confirm";
  isHtmlContent = false;
  content = '';
  acceptButton = 'Confirm';
  rejectButton  = 'Reject';
  actionAlign = 'end';
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
      if(data && data.title){
        this.title = data.title;
      }if(data && data.isHtmlContent){
        this.isHtmlContent = data.isHtmlContent;
      }if(data && data.content){
        this.content = data.content;
      }if(data && data.acceptButton){
        this.acceptButton = data.acceptButton;
      }if(data && data.rejectButton){
        this.rejectButton = data.rejectButton;
      }if(data && data.actionAlign){
        this.actionAlign = data.actionAlign;
      }
    }



  ngOnInit(): void {
  }

}
