import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-statement',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './upload-statement.component.html',
  styleUrl: './upload-statement.component.scss'
})
export class UploadStatementComponent {
  readonly dialogRef = inject(MatDialogRef<UploadStatementComponent>);
  uploadStatementForm !: FormGroup;

  constructor(private snackbar: MatSnackBar){}

  ngOnInit():void{
    this.uploadStatementForm = new FormGroup({
      uploadFile: new FormControl('' , [Validators.required]),
    });
  }

  onUpload(){
    console.log(this.uploadStatementForm.value);
    if(this.uploadStatementForm.valid){
      const data = this.uploadStatementForm.value;
      this.snackbar.open('File uploaded successfully', 'Close', {
        duration: 3000,
      });
      this.dialogRef.close('')
    }
  }

  onCancel(){
    this.dialogRef.close('');
  }
}
