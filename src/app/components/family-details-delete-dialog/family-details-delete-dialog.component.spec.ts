import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailsDeleteDialogComponent } from './family-details-delete-dialog.component';

describe('FamilyDetailsDeleteDialogComponent', () => {
  let component: FamilyDetailsDeleteDialogComponent;
  let fixture: ComponentFixture<FamilyDetailsDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyDetailsDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyDetailsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
