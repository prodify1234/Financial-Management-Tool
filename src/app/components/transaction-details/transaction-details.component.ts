import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';

export interface PeriodicElement {
  date: string;
  description: string;
  amount: string;
  category: string;
  actions?: string;
}

const TRANSACTION_DATA: PeriodicElement[] = [
  {
    date: '2023-04-15',
    description: 'Salary Credit',
    amount: '+50000',
    category: 'Income',
  },
];


@Component({
  selector: 'app-transaction-details',
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatDialogModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent implements OnInit {

  transactionColumns: string[] = [
    'date',
    'description',
    'amount',
    'category',
    'actions',
  ];
  transactionSource = TRANSACTION_DATA;

  ngOnInit(): void {

  }

  constructor(private matDialog: MatDialog) {}

  onUpdateStatement(){
    const data = this.matDialog.open(UploadStatementComponent, {
      width: '600px',
      minWidth: '600px',
      minHeight: '400px',
      disableClose: true,
      data: {
        type: 'add'
      }
    })
  }
}
