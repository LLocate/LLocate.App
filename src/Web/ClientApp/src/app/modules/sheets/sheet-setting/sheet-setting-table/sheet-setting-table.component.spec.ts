import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSettingTableComponent } from './sheet-setting-table.component';

describe('SheetSettingTableComponent', () => {
  let component: SheetSettingTableComponent;
  let fixture: ComponentFixture<SheetSettingTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheetSettingTableComponent]
    });
    fixture = TestBed.createComponent(SheetSettingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
