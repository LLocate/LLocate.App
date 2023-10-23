import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetWorkbookComponent } from './sheet-workbook.component';

describe('SheetWorkbookComponent', () => {
  let component: SheetWorkbookComponent;
  let fixture: ComponentFixture<SheetWorkbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetWorkbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetWorkbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
