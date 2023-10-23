import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSettingComponent } from './sheet-setting.component';

describe('SheetSettingComponent', () => {
  let component: SheetSettingComponent;
  let fixture: ComponentFixture<SheetSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
