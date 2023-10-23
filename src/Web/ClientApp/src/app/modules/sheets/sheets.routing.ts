import { RouterModule, Routes } from "@angular/router";
import { SheetsComponent } from "./sheets.component";
import { SheetWorkbookComponent } from "./sheet-workbook/sheet-workbook.component";
import { SheetSettingComponent } from "./sheet-setting/sheet-setting.component";

export const routes: Routes = [
    {
        path: '',
        component: SheetsComponent,
        // canActivate: [UserDefaultRoute],
        children: [
            {
                path: '',
                redirectTo: 'workbook',
                pathMatch: 'full'
            },
            {
                path: 'workbook',
                component: SheetWorkbookComponent
            },
            {
                path: 'setting',
                component: SheetSettingComponent
            },
        ]
    },
];
export const SheetsRouting = RouterModule.forChild(routes);