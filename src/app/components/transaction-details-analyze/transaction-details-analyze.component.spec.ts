import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsAnalyzeComponent } from './transaction-details-analyze.component';

describe('TransactionDetailsAnalyzeComponent', () => {
  let component: TransactionDetailsAnalyzeComponent;
  let fixture: ComponentFixture<TransactionDetailsAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailsAnalyzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
