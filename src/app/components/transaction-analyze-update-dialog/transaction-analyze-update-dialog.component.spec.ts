import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAnalyzeUpdateDialogComponent } from './transaction-analyze-update-dialog.component';

describe('TransactionAnalyzeUpdateDialogComponent', () => {
  let component: TransactionAnalyzeUpdateDialogComponent;
  let fixture: ComponentFixture<TransactionAnalyzeUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionAnalyzeUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAnalyzeUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
