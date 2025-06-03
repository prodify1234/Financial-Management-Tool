
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';

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
    MatSnackBarModule,
    MatIconModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './upload-statement.component.html',
  styleUrl: './upload-statement.component.scss'
})
export class UploadStatementComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput !: ElementRef<InputEvent>
  readonly dialogRef = inject(MatDialogRef<UploadStatementComponent>);
  uploadStatementForm !: FormGroup;

  constructor(private snackbar: MatSnackBar, private fileUploadService: FileUploadService){}

  ngOnInit():void{
    this.uploadStatementForm = new FormGroup({
      uploadFile: new FormControl('' , [Validators.required]),
    });
  }

  onUpload(){
    console.log(this.uploadStatementForm.value);
    const data : File = this.uploadStatementForm.value.uploadFile;

    const body = {
      'person_id': sessionStorage.getItem('personId'),
      'file_name': data.name,
      'file_type': data.type
    }

    console.log(body);

    this.fileUploadService.uploadFile(body).subscribe((response:any)=>{
      console.log('File upload response: ', response);

      if(response.data.presigned_url){
        this.fileUploadService.uploadToS3(response.data.presigned_url, data).subscribe(
          (response:any)=>{
            console.log('Uploaded to S3:', response)
          },
          (error:any)=>{
            console.log('Upload error: ',error)
          }
        )
      }

      const validateBody = {
        'statement_upload_id' : response.data.statement_upload_id,
        'file_key' : response.data.file_key
      }

      this.fileUploadService.validateFile(validateBody).subscribe((response:any)=>{
        console.log('Validate file response: ', response);
      })
    })
    this.snackbar.open('File uploaded successfully', 'Close', {
      duration: 3000,
    });
    this.dialogRef.close('')
  }

  onCancel(){
    this.dialogRef.close('');
  }

  onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.uploadStatementForm.patchValue({
      uploadFile: file
    });
    this.uploadStatementForm.get('uploadFile')?.updateValueAndValidity();
    console.log('Selected file:', file.name);
  }
}


  browseFiles(){

  }

  ngAfterViewInit(): void {

  }
}
