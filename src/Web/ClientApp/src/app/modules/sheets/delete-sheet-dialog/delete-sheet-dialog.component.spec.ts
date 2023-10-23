import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSheetDialogComponent } from './delete-sheet-dialog.component';

describe('DeleteSheetDialogComponent', () => {
  let component: DeleteSheetDialogComponent;
  let fixture: ComponentFixture<DeleteSheetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSheetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
