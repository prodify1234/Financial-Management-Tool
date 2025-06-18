import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialItemsHeaderComponent } from './financial-items-header.component';

describe('FinancialItemsHeaderComponent', () => {
  let component: FinancialItemsHeaderComponent;
  let fixture: ComponentFixture<FinancialItemsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialItemsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialItemsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
