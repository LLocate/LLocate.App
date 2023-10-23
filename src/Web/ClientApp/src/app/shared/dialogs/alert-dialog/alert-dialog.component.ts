import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface AlertDialogData {
  title: string;
  isHtmlContent: boolean;
  content: string;
  closeButton: string;
  actionAlign: string;
}
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertDialogComponent implements OnInit {
  title = "Alert";
  isHtmlContent = false;
  content = '';
  closeButton = 'Close';
  actionAlign = 'end';
  html: SafeHtml;
  
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {
      if(data && data.title){
        this.title = data.title;
      }if(data && data.isHtmlContent){
        this.isHtmlContent = data.isHtmlContent;
        this.html = this.sanitizer.bypassSecurityTrustHtml(data.content);
      }if(data && data.content){
        this.content = data.content;
      }if(data && data.closeButton){
        this.closeButton = data.closeButton;
      }if(data && data.actionAlign){
        this.actionAlign = data.actionAlign;
      }
    }

  ngOnInit(): void {
  }

}
