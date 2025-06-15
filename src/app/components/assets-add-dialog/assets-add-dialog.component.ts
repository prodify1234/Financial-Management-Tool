import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OnInit } from '@angular/core';
import { FinancialItemsService } from '../../services/financial-items.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assets-add-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule
  ],
  providers: [
    ...provideNativeDateAdapter(),
  ],
  templateUrl: './assets-add-dialog.component.html',
  styleUrl: './assets-add-dialog.component.scss',
})
export class AssetsAddDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<AssetsAddDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  assets : any[] =[];
  liabilities : any[] = [];
  selectedType: string= '';
  assetItemsForm !:FormGroup;
  liabilitiesItemsForm !: FormGroup;

  constructor(private financialItemsService: FinancialItemsService){
    this.assetItemsForm = new FormGroup({
      assetType : new FormControl<string | null>(null),
      currentValue : new FormControl<number | null>(null),
      purchaseValue : new FormControl<number | null>(null),
      expectedRoi : new FormControl<number | null>(null),
      purchaseDate : new FormControl<string | null>(null)
    })

    this.liabilitiesItemsForm = new FormGroup({
      liabilityType : new FormControl<string | null>(null),
      outstandingValue : new FormControl<number | null>(null),
      principalAmount : new FormControl<number | null>(null),
      tenure : new FormControl<number | null>(null),
      interestRate : new FormControl<number | null>(null)
    })
  }

  ngOnInit(): void {
    this.getGenericCategories();
  }



  getGenericCategories() {
    this.financialItemsService.getGenericCategories().subscribe((response:any)=>{
      console.log('Get Generic Categories Response: ', response);
      response.data.items.map((item:any)=>{
        if(item.head === 'Investment'){
          this.assets.push({ display_name: item.display_name, category_id: item.id })
        }
        else if(item.head === 'Financial Obligations'){
          this.liabilities.push({display_name: item.display_name, category_id: item.id})
        }
      })

      console.log('Assets array: ', this.assets)
    console.log('Liabilities array: ', this.liabilities)
    })
  }

  onAdd() {
    if(this.selectedType === 'assets') {
      console.log('Assets Form: ', this.assetItemsForm.value);

      const rawDate : Date = this.assetItemsForm.get('purchaseDate')?.value;

      const purchase_date = rawDate ? rawDate.toISOString().split('T')[0] : null;

      const assetBody = {
        asset_type : this.assetItemsForm.get('assetType')?.value.display_name,
        category_id : this.assetItemsForm.get('assetType')?.value.category_id,
        current_value : this.assetItemsForm.get('currentValue')?.value,
        purchase_value : this.assetItemsForm.get('purchaseValue')?.value,
        expectedRoi : this.assetItemsForm.get('expected_roi')?.value,
        purchase_date : purchase_date
      }

      this.financialItemsService.createFinancialItem(assetBody).subscribe((response:any)=>{
        console.log('New Asset Item: ', response);

        this.dialogRef.close();
      })
    }
    else{
      console.log('Liabilities Form: ', this.liabilitiesItemsForm.value);

      const liabilityBody = {
        liability_type : this.liabilitiesItemsForm.get('liabilityType')?.value.display_name,
        category_id : this.liabilitiesItemsForm.get('liabilityType')?.value.category_id,
        outstanding_value : this.liabilitiesItemsForm.get('outstandingValue')?.value,
        principal_amount : this.liabilitiesItemsForm.get('principalAmount')?.value,
        tenure : this.liabilitiesItemsForm.get('tenure')?.value,
        interest_rate : this.liabilitiesItemsForm.get('interestRate')?.value
      }

      this.financialItemsService.createLiabilityItem(liabilityBody).subscribe((response:any)=>{
        console.log('New Liability Item: ', response);

        this.dialogRef.close();
      })
    }
  }

  onCancel(){
    this.dialogRef.close()
  }
}
