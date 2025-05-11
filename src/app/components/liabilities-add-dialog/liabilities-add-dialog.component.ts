import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-liabilities-add-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './liabilities-add-dialog.component.html',
  styleUrl: './liabilities-add-dialog.component.scss'
})
export class LiabilitiesAddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LiabilitiesAddDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  constructor(){

  }

  onCancel(){
    this.dialogRef.close()

  }

}
