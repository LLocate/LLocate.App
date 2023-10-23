import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSummaryComponent } from './sheet-summary.component';

describe('SheetSummaryComponent', () => {
  let component: SheetSummaryComponent;
  let fixture: ComponentFixture<SheetSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
