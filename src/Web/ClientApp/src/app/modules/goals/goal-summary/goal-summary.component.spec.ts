import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSummaryComponent } from './goal-summary.component';

describe('GoalSummaryComponent', () => {
  let component: GoalSummaryComponent;
  let fixture: ComponentFixture<GoalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
