import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalEntryDialogComponent } from './goal-entry-dialog.component';

describe('GoalEntryDialogComponent', () => {
  let component: GoalEntryDialogComponent;
  let fixture: ComponentFixture<GoalEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalEntryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
