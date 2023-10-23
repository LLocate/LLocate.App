import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDistributionPercentageDialogComponent } from './goal-distribution-percentage-dialog.component';

describe('GoalDistributionPercentageDialogComponent', () => {
  let component: GoalDistributionPercentageDialogComponent;
  let fixture: ComponentFixture<GoalDistributionPercentageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalDistributionPercentageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDistributionPercentageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
