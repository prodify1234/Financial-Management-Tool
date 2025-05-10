import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccountDetailsComponent } from './add-edit-account-details.component';

describe('AddEditAccountDetailsComponent', () => {
  let component: AddEditAccountDetailsComponent;
  let fixture: ComponentFixture<AddEditAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAccountDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
