import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Globals } from '../services/globals';
import { UtilityService } from '../services/utility.service';
import { DecimalPipe } from '@angular/common';
import { UserMenuItems } from './menu-items/user-menu-items';

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        DecimalPipe
    ]
})

export class SharedProviderModule {
    public static forRoot(): ModuleWithProviders<SharedProviderModule> {
        return {
            ngModule: SharedProviderModule,
            providers: [
                Globals,
                UserMenuItems,
                UtilityService,
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: SharedProviderModule) {
        if (parentModule) {
            throw new Error('SharedModule is already loaded. Import it in the AppModule only');
        }
    }
}
