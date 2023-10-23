import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalIndexComponent } from './portal-index.component';

describe('PortalIndexComponent', () => {
  let component: PortalIndexComponent;
  let fixture: ComponentFixture<PortalIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalIndexComponent]
    });
    fixture = TestBed.createComponent(PortalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
