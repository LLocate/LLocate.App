import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarVerticalGroupedComponent } from './chart-bar-vertical-grouped.component';

describe('ChartBarVerticalGroupedComponent', () => {
  let component: ChartBarVerticalGroupedComponent;
  let fixture: ComponentFixture<ChartBarVerticalGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarVerticalGroupedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarVerticalGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
