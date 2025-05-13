import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowsComponent } from './cashflows.component';

describe('CashflowsComponent', () => {
  let component: CashflowsComponent;
  let fixture: ComponentFixture<CashflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashflowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
