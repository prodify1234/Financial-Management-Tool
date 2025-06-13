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
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';
import { BreadcrumpsComponent } from '../shared/breadcrumps/breadcrumps.component';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-details-analyze',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    TableShimmerComponent,
    BreadcrumpsComponent,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDialogActions
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transaction-details-analyze.component.html',
  styleUrl: './transaction-details-analyze.component.scss',
})
export class TransactionDetailsAnalyzeComponent implements OnInit {
  constructor(){
    this.filterForm = new FormGroup({
      transactionFrom: new FormControl<string | null>(null),
      transactionTo: new FormControl<string | null>(null),
      amountFrom: new FormControl<number | null>(null),
      amountTo: new FormControl<number | null>(null),
      classificationIn: new FormControl<string[] | null>(null),
      subClassificationIn: new FormControl<string[] | null>(null),
      confidenceFrom: new FormControl<number | null>(null),
      confidenceTo: new FormControl<number | null>(null),
      manuallyOverridden: new FormControl<boolean | null>(null),
      accountProvider: new FormControl<string | null>(null),
      analyzedBy: new FormControl<string | null>(null)
    });
  }
  transactionColumns: string[] = [
    'date',
    'account_Provider',
    'amount',
    'debit',
    'description',
    'classification',
    'sub_Classification',
    'confidence_Score',
    'manually_Overridden',
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

  filterForm!: FormGroup;

  showFilters = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private transactionService = inject(TransactionDetailsService);
  private sharedService = inject(SharedService);

  ngOnInit(): void {
    this.viewTransactionAnalysis();
  }

  viewTransactionAnalysis() {
    this.loader.update(() => true);
    this.route.queryParams.subscribe((params: any) => {
      (this.personId = params['person_id']),
      (this.statementId = params['statement_upload_id']);

      console.log('Person ID: ', this.personId);
      console.log('Statement ID: ', this.statementId);
    });

    const getArrayValue = (value: string | string[] | null): string[] | null => {
      if (typeof value === 'string') {
        const arr = value.split(',').map(v => v.trim()).filter(v => v !== '');
        return arr.length ? arr : null;
      }
      return value;
    };

    const body = {
      person_id_in : [this.personId],
      statement_upload_id_in : [this.statementId],
      transaction_date_from : this.filterForm.get('transactionFrom')?.value,
      transaction_date_to : this.filterForm.get('transactionTo')?.value,
      amount_from : this.filterForm.get('amountFrom')?.value,
      amount_to : this.filterForm.get('amountTo')?.value,
      classifications_in : getArrayValue(this.filterForm.get('classificationIn')?.value),
      sub_classification_in : getArrayValue(this.filterForm.get('subClassificationIn')?.value),
      confidence_score_from : this.filterForm.get('confidenceFrom')?.value,
      confidence_score_to : this.filterForm.get('confidenceTo')?.value,
      manually_overridden : this.filterForm.get('manuallyOverridden')?.value,
      account_provider : this.filterForm.get('accountProvider')?.value,
      analyzed_by : this.filterForm.get('analyzedBy')?.value
    }

    this.transactionService
      .viewTransactionAnalysis(
        this.currentPage() + 1,
        this.rowsOnPage(),
        body
      )
      .subscribe((response: any) => {
        console.log('View Transaction Analysis Response: ', response);
        this.totalTransactions.update(() => response?.data?.total);
        this.allTransactions = response.data.items;
        console.log('All transactions: ', this.allTransactions);
        this.transactionSource = this.allTransactions.map((item: any) => ({
          date: new Date(item.transaction_date).toLocaleDateString('en-GB'),
          account_Provider: item.account_provider,
          amount: item.amount,
          credit: item.credit,
          debit: item.debit,
          description: item.description,
          classification: item.classification,
          sub_Classification: item.sub_classification,
          confidence_Score: item.confidence_score,
          manually_Overridden: item.manually_overridden,
        }));
        this.loader.update(() => false);
      });
  }

  onPage(event: PageEvent) {
    console.log(event);
    this.currentPage.update(() => event.pageIndex);
    this.rowsOnPage.update(() => event.pageSize);
    this.previousPage.update(() => event.previousPageIndex);
    this.viewTransactionAnalysis();
  }

  onFilter(){
    console.log('Filter Form: ', this.filterForm.value);
    this.viewTransactionAnalysis();
  }

  onClear(){
    this.filterForm.reset();
    this.viewTransactionAnalysis();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
