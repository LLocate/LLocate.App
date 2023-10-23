import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAdvancedPieComponent } from './chart-advanced-pie.component';

describe('ChartAdvancedPieComponent', () => {
  let component: ChartAdvancedPieComponent;
  let fixture: ComponentFixture<ChartAdvancedPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAdvancedPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartAdvancedPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
