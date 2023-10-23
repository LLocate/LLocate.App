import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetTableComponent } from './sheet-table.component';

describe('SheetTableComponent', () => {
  let component: SheetTableComponent;
  let fixture: ComponentFixture<SheetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
