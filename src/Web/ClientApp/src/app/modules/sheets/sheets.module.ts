import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetsRouting } from './sheets.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SheetItemDialogComponent } from './sheet-item-dialog/sheet-item-dialog.component';
import { SheetItemEntryDialogComponent } from './sheet-item-entry-dialog/sheet-item-entry-dialog.component';
import { SheetItemSettingDialogComponent } from './sheet-item-setting-dialog/sheet-item-setting-dialog.component';
import { SheetSettingComponent } from './sheet-setting/sheet-setting.component';
import { SheetWorkbookComponent } from './sheet-workbook/sheet-workbook.component';
import { SheetsComponent } from './sheets.component';
import { FormsModule } from '@angular/forms';
import { SheetTableComponent } from './sheet-workbook/sheet-table/sheet-table.component';
import { SheetSummaryComponent } from './sheet-workbook/sheet-summary/sheet-summary.component';
import { DeleteSheetDialogComponent } from './delete-sheet-dialog/delete-sheet-dialog.component';
import { SheetSettingSummaryComponent } from './sheet-setting/sheet-setting-summary/sheet-setting-summary.component';
import { SheetSummaryUtilizationListComponent } from './sheet-workbook/sheet-summary-utilization-list/sheet-summary-utilization-list.component';
import { SheetSettingTableComponent } from './sheet-setting/sheet-setting-table/sheet-setting-table.component';



@NgModule({
  declarations: [
    SheetsComponent,
    SheetItemDialogComponent,
    SheetItemSettingDialogComponent,
    SheetItemEntryDialogComponent,
    DeleteSheetDialogComponent,
    SheetSettingComponent,
    SheetTableComponent,
    SheetWorkbookComponent,
    SheetSummaryComponent,
    SheetSettingSummaryComponent,
    SheetSummaryUtilizationListComponent,
    SheetSettingTableComponent,
  ],
  imports: [
    SheetsRouting,
    SharedModule,
    FormsModule,
    CommonModule
  ]
})
export class SheetsModule { }
