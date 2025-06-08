import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { SharedService } from '../../services/shared.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableShimmerComponent } from "../shared/table-shimmer/table-shimmer.component";

@Component({
  selector: 'app-transaction-details-analyze',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatSliderModule, MatTableModule, MatButtonModule, MatProgressBarModule, FormsModule, CommonModule, RouterModule, MatPaginatorModule, TableShimmerComponent],
  templateUrl: './transaction-details-analyze.component.html',
  styleUrl: './transaction-details-analyze.component.scss'
})
export class TransactionDetailsAnalyzeComponent implements OnInit {

  transactionColumns:string[]=[
    'date',
    'account_Provider',
    'amount',
    'classification',
    'sub_Classification',
    'confidence_Score',
    'credit',
    'debit',
    'manually_Overridden'
  ];
  loader = signal<boolean>(false);

  currentPage = signal<number>(0);
  previousPage = signal<number | undefined>(0);
  rowsOnPage = signal<number>(10);
  totalTransactions = signal<number>(0);

  selectedClassification = 'all';
  minConfidence = 0;
  personId: string = '';
  statementId: string = '';

  allTransactions: any[] = [];
  transactionSource: any[] = [];

  get Confidence(): number {
    return this.minConfidence / 100;
  }

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private transactionService = inject(TransactionDetailsService);
  private sharedService = inject(SharedService);

  ngOnInit(): void {
    this.viewTransactionAnalysis();
  }

  viewTransactionAnalysis() {
    this.loader.update(() => true);
    this.route.queryParams.subscribe((params:any) => {
      this.personId = params['person_id'],
      this.statementId = params['statement_upload_id']

      console.log('Person ID: ', this.personId);
      console.log('Statement ID: ', this.statementId);
    })

    this.transactionService.viewTransactionAnalysis(this.currentPage() + 1, this.rowsOnPage(), this.personId, this.statementId).subscribe((response:any)=>{
      console.log('View Transaction Analysis Response: ', response);
      this.totalTransactions.update(() => response?.data?.total);
      this.allTransactions = response.data.items;
      console.log('All transactions: ', this.allTransactions)
      this.transactionSource = this.allTransactions.map((item:any)=>({
        date: new Date(item.transaction_date).toLocaleDateString('en-GB'),
        account_Provider: item.account_provider,
        amount: item.amount,
        classification: item.classification,
        sub_Classification: item.sub_classification,
        confidence_Score: item.confidence_score,
        credit: item.credit,
        debit: item.debit,
        manually_Overridden: item.manually_overridden
      }))
      this.loader.update(() => false);
    })
  }

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.viewTransactionAnalysis();
  }

}
