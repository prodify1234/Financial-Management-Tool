import { CommonModule } from '@angular/common';
import { IncomeDeclerationService } from './../../services/income-decleration.service';
import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-add-income-decleration',
  imports: [
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './add-income-decleration.component.html',
  styleUrl: './add-income-decleration.component.scss'
})
export class AddIncomeDeclerationComponent implements OnInit {
  loader= signal<boolean>(false);
  incomeDeclerationForm!:FormGroup;
  incomeService =  inject(IncomeDeclerationService);
  assetTypes:any[]=[];
  mainClassifications:any[]=[];
  subClassifications:any[]=[];
  selectedMainClassification:string='';
  assetId : any = '';
  categoryId : any = '';
  readonly dialogRef = inject(MatDialogRef<AddIncomeDeclerationComponent>);

  constructor(){
    this.incomeDeclerationForm = new FormGroup({
      source : new FormControl(),
      income : new FormControl(),
      has_asset : new FormControl(),
      asset_type : new FormControl(),
      frequency : new FormControl(),
      main_classification : new FormControl(),
      sub_classification : new FormControl()
    })
  }

  ngOnInit(): void {
    this.getMainClassifications();

    this.incomeDeclerationForm.get('asset_type')?.disable();
    this.incomeDeclerationForm.get('sub_classification')?.disable();
  }

  onAssetChange(){
    console.log(this.incomeDeclerationForm.get('has_asset')?.value);

    if(this.incomeDeclerationForm.get('has_asset')?.value){
      this.incomeService.getAllAssets().subscribe((response:any)=>{
        console.log('All Asset Types: ', response);
        this.assetTypes = response.data;
        this.incomeDeclerationForm.get('asset_type')?.enable();
      })
    }
    else{
      this.assetTypes = [];
      this.assetId = null;
      this.categoryId = null
      this.incomeDeclerationForm.get('asset_type')?.disable();
    }
  }

  onAssetTypeChange(event:any){
    console.log('Event: ', event);

    this.assetId = event.id;
    this.categoryId = event.category_id;
  }

  onMainClassificationSelection(event:any){
    console.log('main classification event: ', event);
    this.selectedMainClassification = event;

    this.incomeService.getSubClassifications(this.selectedMainClassification).subscribe((response:any)=>{
      console.log('Response sub classifications: ', response);
      this.subClassifications = response.data[0].sub_classifications;
      this.incomeDeclerationForm.get('sub_classification')?.enable();
    })
  }

  getMainClassifications(){
    this.incomeService.getMainClassifications().subscribe((response:any)=>{
      console.log('Response Main Classifications: ', response);
      this.mainClassifications = response.data;
    })
  }

  onCancel(){
     this.dialogRef.close('');
  }

  onAddIncome(){
    const body = {
      source : this.incomeDeclerationForm.get('source')?.value,
      income : this.incomeDeclerationForm.get('income')?.value,
      has_asset : this.incomeDeclerationForm.get('has_asset')?.value,
      asset_id : this.assetId || null,
      frequency : this.incomeDeclerationForm.get('frequency')?.value,
      main_classification : this.incomeDeclerationForm.get('main_classification')?.value,
      sub_classification : this.incomeDeclerationForm.get('sub_classification')?.value
    }
    this.incomeService.createIncome(body).subscribe((response:any)=>{
      console.log('Response Create Income: ', response);

      this.dialogRef.close(response);
    })
  }
}
