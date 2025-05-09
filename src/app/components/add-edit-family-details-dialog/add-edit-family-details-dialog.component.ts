import { Component, inject, signal } from '@angular/core';
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
export class AddEditFamilyDetailsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditFamilyDetailsDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);
  familyDetailsForm !: FormGroup;
  editFamilyDetailsForm !: FormGroup;
  loader  = signal<boolean>(false);
  relationships = [ 'Sibling' , 'Parent' , 'Child' , 'Spouse'];
  constructor(private personsService: RegisterService, private snackbar: SnackbarService) {
    
  }
  ngOnInit(): void {
    console.log(this.data);
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.familyDetailsForm = new FormGroup({
      first_name: new FormControl('' , [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      phone_number: new FormControl("",[Validators.required]),
      pan_number: new FormControl("",[Validators.required]),
      aadhaar_number: new FormControl("",[Validators.required]),
      address: new FormControl("",[Validators.required]), 
    });

    this.editFamilyDetailsForm = new FormGroup({
      relation : new FormControl('', [Validators.required]),
    })
  }

  onAdd(){
    console.log(this.familyDetailsForm.value);
    if(this.familyDetailsForm.valid){
      const data = this.familyDetailsForm.value;
      this.loader.update(()=>true)
      this.personsService.createPerson(data).subscribe((response)=>{
        console.log(response);
        this.loader.update(()=> false)
        this.snackbar.success('Family member added successfully');
        this.dialogRef.close(response)
      })
      // this.dialogRef.close(data);
    }
  }
  onUpdate(){
    
  }

  onCancel(){
    this.dialogRef.close('');
  }

}
