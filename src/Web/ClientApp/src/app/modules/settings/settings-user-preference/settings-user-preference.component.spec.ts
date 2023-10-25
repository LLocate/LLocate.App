import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUserPreferenceComponent } from './settings-user-preference.component';

describe('SettingsUserPreferenceComponent', () => {
  let component: SettingsUserPreferenceComponent;
  let fixture: ComponentFixture<SettingsUserPreferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsUserPreferenceComponent]
    });
    fixture = TestBed.createComponent(SettingsUserPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
