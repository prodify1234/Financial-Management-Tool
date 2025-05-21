import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditAccountDetailsComponent } from '../add-edit-account-details/add-edit-account-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountsService } from '../../services/accounts.service';

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
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatDialogModule, MatTabsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {

  accountColumns: string[] = [
    'account_holder',
    'account_type',
    'provider',
    'account_number',
    'interest_rate',
    'actions',
  ];
  accountSource : any[] = [];
  allAccounts:any[]=[];

  linkedAccountColumns: string[] = [
    'holder_name',
    'relationship',
    'account_type',
    'provider',
    'account_number'
  ];
  linkedAccountSource : any[] = [];
  linkedAccounts:any[]=[];

  constructor(private matDialog: MatDialog, private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsService.getAllAccountDetails().subscribe((response:any)=>{
      console.log("Accounts Response: ", response);
      this.allAccounts = response.accounts;
      this.accountSource = this.allAccounts.map((acc:any)=>({
        account_holder: acc.account_holder,
        account_type: acc.account_type,
        provider: acc.provider,
        account_number: acc.account_number,
        interest_rate: acc.interest_rate,
        actions: ''
      }))

    })

    this.accountsService.getAllLinkedAccountDetails().subscribe((response:any)=>{
      console.log('Linked Accounts: ', response);
      this.linkedAccounts = response.accounts;
      this.linkedAccountSource = this.linkedAccounts.map((acc:any)=>({
        holder_name: acc.holder_name,
        relationship: acc.relationship,
        account_type: acc.account_type,
        provider: acc.provider,
        account_number: acc.account_number
      }))
    })
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

  onEdit(element:any){
    console.log(element)
    const data = this.matDialog.open(AddEditAccountDetailsComponent,{
      width: '600px',
      minWidth: '600px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'edit',
        data:  element
      }

    });
  }
}
