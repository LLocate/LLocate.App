import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetItemEntryDialogComponent } from './sheet-item-entry-dialog.component';

describe('SheetItemEntryDialogComponent', () => {
  let component: SheetItemEntryDialogComponent;
  let fixture: ComponentFixture<SheetItemEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetItemEntryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetItemEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
