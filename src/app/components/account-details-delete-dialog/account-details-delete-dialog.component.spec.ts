import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsDeleteDialogComponent } from './account-details-delete-dialog.component';

describe('AccountDetailsDeleteDialogComponent', () => {
  let component: AccountDetailsDeleteDialogComponent;
  let fixture: ComponentFixture<AccountDetailsDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetailsDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDetailsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
