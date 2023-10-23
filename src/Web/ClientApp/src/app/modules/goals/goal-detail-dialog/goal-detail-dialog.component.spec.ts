import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDetailDialogComponent } from './goal-detail-dialog.component';

describe('GoalDetailDialogComponent', () => {
  let component: GoalDetailDialogComponent;
  let fixture: ComponentFixture<GoalDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
