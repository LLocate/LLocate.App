import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePreviewSvgComponent } from './theme-preview-svg.component';

describe('ThemePreviewSvgComponent', () => {
  let component: ThemePreviewSvgComponent;
  let fixture: ComponentFixture<ThemePreviewSvgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemePreviewSvgComponent]
    });
    fixture = TestBed.createComponent(ThemePreviewSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
