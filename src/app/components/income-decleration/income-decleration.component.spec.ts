import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDeclerationComponent } from './income-decleration.component';

describe('IncomeDeclerationComponent', () => {
  let component: IncomeDeclerationComponent;
  let fixture: ComponentFixture<IncomeDeclerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeDeclerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDeclerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
