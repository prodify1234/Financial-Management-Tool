import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-assets-add-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './assets-add-dialog.component.html',
  styleUrl: './assets-add-dialog.component.scss',
})
export class AssetsAddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AssetsAddDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(){

  }


  onCancel(){
    this.dialogRef.close()

  }
}
