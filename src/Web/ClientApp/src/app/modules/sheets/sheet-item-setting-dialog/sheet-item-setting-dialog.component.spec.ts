import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetItemSettingDialogComponent } from './sheet-item-setting-dialog.component';

describe('SheetItemSettingDialogComponent', () => {
  let component: SheetItemSettingDialogComponent;
  let fixture: ComponentFixture<SheetItemSettingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetItemSettingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetItemSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
