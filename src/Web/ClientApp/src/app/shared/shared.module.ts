import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { EnumPipe } from './pipe/enum.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ArraystringPipe } from './pipe/arraystring.pipe';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { Globals } from '../services/globals';
import { RouterModule } from '@angular/router';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartAdvancedPieComponent } from './components/charts/chart-advanced-pie/chart-advanced-pie.component';
import { ChartBarVerticalGroupedComponent } from './components/charts/chart-bar-vertical-grouped/chart-bar-vertical-grouped.component';
import { ChartLineComponent } from './components/charts/chart-line/chart-line.component';
import { ChartPieComponent } from './components/charts/chart-pie/chart-pie.component';
import { ThemePreviewSvgComponent } from './components/theme-preview-svg/theme-preview-svg.component';
@NgModule({
    declarations: [
        ConfirmDialogComponent,
        AlertDialogComponent,
        ThemePreviewSvgComponent,

        PageLoaderComponent,

        ChartBarVerticalGroupedComponent,
        ChartLineComponent,
        ChartPieComponent,
        ChartAdvancedPieComponent,
        
        TruncatePipe,
        ArraystringPipe,
        EnumPipe,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CdkTableModule,
        MaterialModule,
        FlexLayoutModule,
        NgxChartsModule
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,

        TruncatePipe,
        EnumPipe,
        ArraystringPipe,

        ConfirmDialogComponent,
        AlertDialogComponent,
        PageLoaderComponent,

        ChartBarVerticalGroupedComponent,
        ChartLineComponent,
        ChartPieComponent,
        ChartAdvancedPieComponent,

        ThemePreviewSvgComponent,
    ],
})
export class SharedModule {
}
