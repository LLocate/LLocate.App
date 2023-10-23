import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalEntryTableComponent } from './goal-entry-table.component';

describe('GoalEntryTableComponent', () => {
  let component: GoalEntryTableComponent;
  let fixture: ComponentFixture<GoalEntryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalEntryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
