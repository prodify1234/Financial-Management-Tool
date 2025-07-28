import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomeDeclerationComponent } from './add-income-decleration.component';

describe('AddIncomeDeclerationComponent', () => {
  let component: AddIncomeDeclerationComponent;
  let fixture: ComponentFixture<AddIncomeDeclerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIncomeDeclerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncomeDeclerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
