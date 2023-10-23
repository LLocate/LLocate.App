import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSettingSummaryComponent } from './sheet-setting-summary.component';

describe('SheetSettingSummaryComponent', () => {
  let component: SheetSettingSummaryComponent;
  let fixture: ComponentFixture<SheetSettingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetSettingSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetSettingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
