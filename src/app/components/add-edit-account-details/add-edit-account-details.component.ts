import { Component, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AccountsService } from '../../services/accounts.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-edit-account-details',
  imports: [
    MatProgressBarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    CommonModule

  ],
  templateUrl: './add-edit-account-details.component.html',
  styleUrl: './add-edit-account-details.component.scss'
})
export class AddEditAccountDetailsComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditAccountDetailsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  persons: any[] = [];

  constructor(private snackbar: MatSnackBar, private accountDetails:AccountsService) {}

  loader  = signal<boolean>(false);
  accountDetailsForm !: FormGroup;

  ngOnInit():void{
    this.accountDetails.addAccount().subscribe((response:any)=>{
      console.log('Names response: ', response);
      this.persons = response.data.account_holders;
      console.log('Persons: ', this.persons)
    })

    console.log(this.data);

    if(this.data && this.data.type === 'add'){
        this.accountDetailsForm = new FormGroup({
        id: new FormControl(''),
        person_id: new FormControl('', [Validators.required]),
        account_holder_name: new FormControl('' , [Validators.required]),
        account_type: new FormControl("", [Validators.required]),
        provider: new FormControl("",[Validators.required]),
        statement_type: new FormControl("",[Validators.required]),
        account_number: new FormControl("",[Validators.required]),
        beneficiary_name: new FormControl("",[Validators.required]),
        interest_rate: new FormControl("",[Validators.required]),
      });
    } else {
      this.accountDetailsForm = new FormGroup({
        id: new FormControl({value : this.data?.data?.id , disabled:false}),
        person_id: new FormControl({value: this.data?.data?.person_id , disabled:true}, [Validators.required]),
        account_holder_name: new FormControl({value : this.data?.data?.account_holder_name , disabled:true} , [Validators.required]),
        account_type: new FormControl({value : this.data?.data?.account_type , disabled:false}, [Validators.required]),
        provider: new FormControl({value : this.data?.data?.provider , disabled:true},[Validators.required]),
        statement_type: new FormControl({value : this.data?.data?.statement_type , disabled:true},[Validators.required]),
        account_number: new FormControl({value : this.data?.data?.account_number , disabled:true},[Validators.required]),
        beneficiary_name: new FormControl({value : this.data?.data?.beneficiary_name , disabled:false},[Validators.required]),
        interest_rate: new FormControl({value : this.data?.data?.interest_rate , disabled:false},[Validators.required]),
      });
    }
  }

  onAdd(){
    this.loader.update(()=> true)
    console.log(this.accountDetailsForm.value);
    const data = this.accountDetailsForm.value;
    const payload = {
      person_id: data.person_id,
      account_type: data.account_type,
      provider: data.provider,
      statement_period: data.statement_type,
      account_number: data.account_number,
      beneficiary_name: data.beneficiary_name
    };
      this.accountDetails.createAccount(payload).subscribe((response:any)=>{
        console.log('New Account: ', response);
        this.loader.update(()=>false);
        this.snackbar.open('account member added successfully', 'Close', {
          duration: 3000,
      });
      this.dialogRef.close(response)
    })
  }

  onUpdate() {
    this.loader.update(()=> true)
    console.log('Account Type:', this.accountDetailsForm.get('account_type')?.value);
    console.log(this.accountDetailsForm.get('id')?.value);
    this.accountDetails.updateAccountDetails(this.accountDetailsForm.get('id')?.value, this.accountDetailsForm.get('account_type')?.value, this.accountDetailsForm.get('beneficiary_name')?.value, this.accountDetailsForm.get('interest_rate')?.value)
    .subscribe((response:any)=>{
      console.log(response);
      this.loader.update(()=>false);
      this.snackbar.open('Account details updated successfully', 'Close', {
        duration: 3000,
      });
      this.dialogRef.close(response)
    })

  }

  onCancel(){
    this.dialogRef.close('');
  }
}
