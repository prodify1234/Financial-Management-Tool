import { Component, inject, OnChanges, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterService } from '../../services/register.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';
import { MatListOption } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FamilyDetailsService } from '../../services/family-details.service';

@Component({
  selector: 'app-add-edit-family-details-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers:[
  ],
  templateUrl: './add-edit-family-details-dialog.component.html',
  styleUrl: './add-edit-family-details-dialog.component.scss'
})
export class AddEditFamilyDetailsDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddEditFamilyDetailsDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);
  familyDetailsForm !: FormGroup;
  editFamilyDetailsForm !: FormGroup;
  loader  = signal<boolean>(false);
  relationships = [ 'SIBLING' , 'PARENT' , 'CHILD' , 'SPOUSE'];
  constructor(private familyDetails : FamilyDetailsService, private snackbar: SnackbarService) {

  }
  ngOnInit(): void {
    console.log(this.data);

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data && this.data.type === 'add'){
      this.familyDetailsForm = new FormGroup({
        id: new FormControl(''),
        first_name: new FormControl('' , [Validators.required]),
        last_name: new FormControl("", [Validators.required]),
        email: new FormControl("",[Validators.required, Validators.email]),
        phone_number: new FormControl("",[Validators.required]),
        pan_number: new FormControl("",[Validators.required]),
        aadhaar_number: new FormControl("",[Validators.required]),
        address: new FormControl("",[Validators.required]),
        relation: new FormControl("", [Validators.required])
      });
    } else {
      this.familyDetailsForm = new FormGroup({
        id: new FormControl({value : this.data?.data?.id , disabled:false}),
        first_name: new FormControl({value : this.data?.data?.first_name , disabled:true} , [Validators.required]),
        last_name: new FormControl({value : this.data?.data?.last_name , disabled:true}, [Validators.required]),
        email: new FormControl({value : this.data?.data?.email , disabled:true},[Validators.required, Validators.email]),
        phone_number: new FormControl({value : this.data?.data?.phone_number , disabled:true},[Validators.required]),
        pan_number: new FormControl({value : this.data?.data?.pan_number , disabled:true},[Validators.required]),
        aadhaar_number: new FormControl({value : this.data?.data?.aadhaar_number , disabled:true},[Validators.required]),
        address: new FormControl({value : this.data?.data?.address , disabled:true},[Validators.required]),
        relation: new FormControl({value : this.data?.data?.relationship_type , disabled:false}, [Validators.required])
      });

    }

  }

  onAdd(){
    console.log(this.familyDetailsForm.value);
    if(this.familyDetailsForm.valid){
      const data = this.familyDetailsForm.value;
      const body = {
        relationship_type : this.familyDetailsForm.get('relation')?.value ,
          client_id: sessionStorage.getItem('clientId'),
          first_name : this.familyDetailsForm.get('first_name')?.value,
          last_name : this.familyDetailsForm.get('last_name')?.value,
          email : this.familyDetailsForm.get('email')?.value,
          phone_number: this.familyDetailsForm.get('phone_number')?.value,
          pan_number : this.familyDetailsForm.get('pan_number')?.value,
          aadhaar_number: this.familyDetailsForm.get('aadhaar_number')?.value,
          address: this.familyDetailsForm.get('address')?.value
        }
      this.loader.update(()=>true)

      this.familyDetails.addFamilyDetails(body).subscribe((response)=>{
        console.log(response);
        this.loader.update(()=> false)
        this.snackbar.success('Family member added successfully');
        this.dialogRef.close(response)
      })
      // this.dialogRef.close(data);
    }
  }
  onUpdate(){
    this.loader.update(()=> true)
    console.log(this.familyDetailsForm)
    this.familyDetails.updateFamilyDetails(this.familyDetailsForm.get('id')?.value , this.familyDetailsForm.get('relation')?.value)
    .subscribe((response)=>{
      console.log(response);
      this.loader.update(()=> false)
      this.snackbar.success('Family member updated successfully');
      this.dialogRef.close(response)
    })
  }

  onCancel(){
    this.dialogRef.close('');
  }

}
