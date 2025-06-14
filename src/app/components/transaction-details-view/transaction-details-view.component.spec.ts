import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsViewComponent } from './transaction-details-view.component';

describe('TransactionDetailsViewComponent', () => {
  let component: TransactionDetailsViewComponent;
  let fixture: ComponentFixture<TransactionDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
