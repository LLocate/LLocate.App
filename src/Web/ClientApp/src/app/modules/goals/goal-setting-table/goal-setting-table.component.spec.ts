import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSettingTableComponent } from './goal-setting-table.component';

describe('GoalSettingTableComponent', () => {
  let component: GoalSettingTableComponent;
  let fixture: ComponentFixture<GoalSettingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalSettingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalSettingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
