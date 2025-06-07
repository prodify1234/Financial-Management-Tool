import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-transaction-details-analyze',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatSliderModule, MatTableModule, MatButtonModule, MatProgressBarModule, FormsModule, CommonModule],
  templateUrl: './transaction-details-analyze.component.html',
  styleUrl: './transaction-details-analyze.component.scss'
})
export class TransactionDetailsAnalyzeComponent implements OnInit {

  selectedClassification = 'all';
  minConfidence = 0;

  get Confidence(): number {
    return this.minConfidence / 100;
  }

  displayedColumns: string[] = ['date', 'description', 'amount', 'classification', 'sub', 'confidence', 'manual'];

  transactions = [
    {
      date: '1/5/2023',
      description: 'GROCERY STORE',
      amount: -75.50,
      classification: 'Expenditure',
      sub: 'Groceries',
      confidence: 95,
      manual: false
    },
    {
      date: '1/8/2023',
      description: 'PAYCHECK DEPOSIT',
      amount: 2500.00,
      classification: 'Income',
      sub: 'Salary',
      confidence: 99,
      manual: false
    },
    {
      date: '1/10/2023',
      description: 'RESTAURANT XYZ',
      amount: -42.00,
      classification: 'Expenditure',
      sub: 'Dining Out',
      confidence: 88,
      manual: false
    },
    {
      date: '1/12/2023',
      description: 'ATM WITHDRAWAL',
      amount: -100.00,
      classification: 'Cash Withdrawal',
      sub: 'ATM',
      confidence: 75,
      manual: true
    },
    {
      date: '1/14/2023',
      description: 'ONLINE SHOPPING',
      amount: -120.34,
      classification: 'Expenditure',
      sub: 'Shopping',
      confidence: 60,
      manual: false
    }
  ];

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private transactionService = inject(TransactionDetailsService);
  private sharedService = inject(SharedService);

  ngOnInit(): void {

  }

}
