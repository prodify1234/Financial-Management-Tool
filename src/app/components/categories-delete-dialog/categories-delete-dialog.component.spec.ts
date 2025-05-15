import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDeleteDialogComponent } from './categories-delete-dialog.component';

describe('CategoriesDeleteDialogComponent', () => {
  let component: CategoriesDeleteDialogComponent;
  let fixture: ComponentFixture<CategoriesDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
