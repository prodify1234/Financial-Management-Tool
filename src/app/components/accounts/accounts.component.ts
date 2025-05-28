import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditAccountDetailsComponent } from '../add-edit-account-details/add-edit-account-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountsService } from '../../services/accounts.service';
import UpdateAccount from '../../Models/UpdateAccount';
import { AccountDetailsDeleteDialogComponent } from '../account-details-delete-dialog/account-details-delete-dialog.component';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';

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


@Component({
  selector: 'app-accounts',
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatMenuModule, MatDialogModule, MatTabsModule, TableShimmerComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {

  accountColumns: string[] = [
    'beneficiary_name',
    'account_type',
    'provider',
    'account_number',
    'interest_rate',
    'actions',
  ];
  accountSource : any[] = [];
  allAccounts:any[]=[];
  accountsLoader  = signal<boolean>(false);

  linkedAccountColumns: string[] = [
    'holder_name',
    'relationship',
    'account_type',
    'provider',
    'account_number'
  ];
  linkedAccountSource : any[] = [];
  linkedAccounts:any[]=[];
  linkedAccountsLoader = signal<boolean>(false)
  loader  = signal<boolean>(false)

  constructor(private matDialog: MatDialog, private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.loadAccountDetails();

    this.loadLinkedAccountDetails();
  }

  loadAccountDetails(){
    this.loader.update(() => true)
    console.log('load account details called.')
    this.accountsService.getAllAccountDetails().subscribe((response:any)=>{
      console.log("Accounts Response: ", response);
      this.allAccounts = response.data.accounts;
      this.accountSource = this.allAccounts.map((acc:any)=>({
        id: acc.id,
        beneficiary_name: acc.beneficiary_name,
        account_type: acc.account_type,
        provider: acc.provider,
        account_number: acc.account_number,
        interest_rate: acc.interest_rate,
        actions: ''
      }))
      this.loader.update(()=> false)
    })
  }

  loadLinkedAccountDetails(){
    this.loader.update(() => true)
    this.accountsService.getAllLinkedAccountDetails().subscribe((response:any)=>{
      console.log('Linked Accounts: ', response);
      this.linkedAccounts = response.data.accounts;
      this.linkedAccountSource = this.linkedAccounts.map((acc:any)=>({
        id: acc.id,
        holder_name: acc.holder_name,
        relationship: acc.relationship,
        account_type: acc.account_type,
        provider: acc.provider,
        account_number: acc.account_number
      }))
      this.loader.update(()=> false)
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
  data.afterClosed().subscribe((result:any)=>{
    if(result) {
      console.log(result);
      this.loadAccountDetails();
      this.loadLinkedAccountDetails();
    }
  })
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
    data.afterClosed().subscribe((result: UpdateAccount | '') => {
      if(result){
        console.log(result);
        this.loadAccountDetails();
        this.loadLinkedAccountDetails();
      }
    });
  }

  onDelete(element:any){
    const data = this.matDialog.open(AccountDetailsDeleteDialogComponent, {
      width: '400px',
      minWidth: '400px',
      height: '300px',
      minHeight: '300px',
      disableClose: true,
      data: {
        type: 'delete',
        data:  element
      }
    });
    data.afterClosed().subscribe((result: any) => {
      if(result){
        console.log(result);
        this.loadAccountDetails();
        this.loadLinkedAccountDetails();
      }
    });
  }
}
