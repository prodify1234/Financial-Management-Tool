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
    MatButtonModule

  ],
  templateUrl: './add-edit-account-details.component.html',
  styleUrl: './add-edit-account-details.component.scss'
})
export class AddEditAccountDetailsComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditAccountDetailsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private snackbar: MatSnackBar) {}

  loader  = signal<boolean>(false);
  accountDetailsForm !: FormGroup;

  ngOnInit():void{
    console.log(this.data);

    if(this.data && this.data.type === 'add'){
        this.accountDetailsForm = new FormGroup({
        account_holder_name: new FormControl('' , [Validators.required]),
        account_type: new FormControl("", [Validators.required]),
        provider: new FormControl("",[Validators.required]),
        statement_type: new FormControl("",[Validators.required]),
        account_number: new FormControl("",[Validators.required]),
        benificiary_name: new FormControl("",[Validators.required]),
        interest_rate: new FormControl("",[Validators.required]),
      });
    } else {
      this.accountDetailsForm = new FormGroup({
        account_holder_name: new FormControl({value : this.data?.data?.account_holder_name , disabled:true} , [Validators.required]),
        account_type: new FormControl({value : this.data?.data?.account_type , disabled:false}, [Validators.required]),
        provider: new FormControl({value : this.data?.data?.provider , disabled:true},[Validators.required]),
        statement_type: new FormControl({value : this.data?.data?.statement_type , disabled:true},[Validators.required]),
        account_number: new FormControl({value : this.data?.data?.account_number , disabled:true},[Validators.required]),
        benificiary_name: new FormControl({value : this.data?.data?.benificiary_name , disabled:false},[Validators.required]),
        interest_rate: new FormControl({value : this.data?.data?.interest_rate , disabled:false},[Validators.required]),
      });

    }

  }

  onAdd(){
    console.log(this.accountDetailsForm.value);
    if(this.accountDetailsForm.valid){
      const data = this.accountDetailsForm.value;
      this.snackbar.open('account member added successfully', 'Close', {
        duration: 3000,
      });
      this.dialogRef.close('')
    }
  }

  onCancel(){
    this.dialogRef.close('');
  }
}
