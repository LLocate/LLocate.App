import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetItemDialogComponent } from './sheet-item-dialog.component';

describe('SheetItemDialogComponent', () => {
  let component: SheetItemDialogComponent;
  let fixture: ComponentFixture<SheetItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
