import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditAccountDetailsComponent } from '../add-edit-account-details/add-edit-account-details.component';

export interface PeriodicElement {
  name: string;
  accountType: string;
  provider: string;
  accountNumber: string;
  interestRate: string;
  actions?: string;
}

export interface LinkedAccount {
  name: string;
  relationship: string;
  accountType: string;
  provider: string;
  accountNumber: string;
}

const ACCOUNT_DATA: PeriodicElement[] = [
  {
    name: 'JohDoe',
    accountType: 'SAVINGS',
    provider: 'jnanesh@gmail.com',
    accountNumber: '08309752441',
    interestRate: '3.5%'
  },
];

const LINKED_ACCOUNT_DATA: LinkedAccount[] = [
  {
    name: 'JohnDoe',
    relationship: 'Spouse',
    accountType: 'Savings',
    provider: 'SBI Bank',
    accountNumber: 'xxxx5678'
  }
]


@Component({
  selector: 'app-accounts',
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatDialogModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {

  accountColumns: string[] = [
    'name',
    'accountType',
    'provider',
    'accountNumber',
    'interestRate',
    'actions',
  ];
  accountSource = ACCOUNT_DATA;

  linkedAccountColumns: string[] = [
    'name',
    'relationship',
    'accountType',
    'provider',
    'accountNumber'
  ];
  linkedAccountSource = LINKED_ACCOUNT_DATA;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {

  }

  onAddAccount() {
    const data = this.matDialog.open(AddEditAccountDetailsComponent,{
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }

    });
  }
}
