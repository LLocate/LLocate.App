import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSummaryUtilizationListComponent } from './sheet-summary-utilization-list.component';

describe('SheetSummaryUtilizationListComponent', () => {
  let component: SheetSummaryUtilizationListComponent;
  let fixture: ComponentFixture<SheetSummaryUtilizationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheetSummaryUtilizationListComponent]
    });
    fixture = TestBed.createComponent(SheetSummaryUtilizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
