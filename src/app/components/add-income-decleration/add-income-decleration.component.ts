import { CommonModule } from '@angular/common';
import { IncomeDeclerationService } from './../../services/income-decleration.service';
import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(){

  }

  ngOnInit(): void {
    this.getMainClassifications();

    console.log('data: ', this.data);

    if(this.data && this.data.type === 'add'){
      this.incomeDeclerationForm = new FormGroup({
        source : new FormControl(),
        income : new FormControl(),
        has_asset : new FormControl(),
        asset_type : new FormControl(),
        frequency : new FormControl(),
        main_classification : new FormControl(),
        sub_classification : new FormControl()
      })

      this.incomeDeclerationForm.get('asset_type')?.disable();
      this.incomeDeclerationForm.get('sub_classification')?.disable();
    }
    else{
      console.log('Frequency type: ',this.data?.data?.frequency )
      this.incomeService.getMainClassifications().subscribe((response:any)=>{
        this.mainClassifications = response.data;

        console.log('Main Classifications: ', this.mainClassifications);
        console.log('data main classification: ', this.data?.data?.main_classification);

        const matchedMainClassification = this.mainClassifications.find((mainClassification:any)=>
          mainClassification === this.data?.data?.main_classification)
        console.log(matchedMainClassification);

        if(matchedMainClassification){
          this.incomeDeclerationForm.patchValue({
            main_classification: matchedMainClassification
          })

          this.incomeService.getSubClassifications(matchedMainClassification).subscribe((response:any)=>{
            console.log('Response sub classifications: ', response);
            this.subClassifications = response.data[0].sub_classifications;

            const matchedSubClassification = this.subClassifications.find((subClassification:any)=>
              subClassification === this.data?.data?.sub_classification
            )

            console.log(matchedSubClassification);

            if(matchedSubClassification){
              this.incomeDeclerationForm.patchValue({
                sub_classification: matchedSubClassification
              })
            }
          })
        }
      })

      this.incomeDeclerationForm = new FormGroup({
        source : new FormControl(this.data?.data?.source),
        income : new FormControl(this.data?.data?.income),
        has_asset : new FormControl(this.data?.data?.has_asset),
        asset_type : new FormControl(this.data?.data?.asset_type),
        frequency : new FormControl(this.data?.data?.frequency),
        main_classification: new FormControl({value : null, disabled:true}),
        sub_classification: new FormControl({value : null, disabled:true})
      })

      if(this.incomeDeclerationForm.get('has_asset')?.value === false){
        this.incomeDeclerationForm.get('asset_type')?.disable();
      }
      else{
        this.incomeDeclerationForm.get('asset_type')?.enable();
      }
    }
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
    console.log('Main Classification: ', this.incomeDeclerationForm.get('main_classification')?.value);
    console.log('Sub Classification: ', this.incomeDeclerationForm.get('sub_classification')?.value)
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

  onUpdate(){
    const body = {
      updates: [
        {
          income_id: this.data?.data?.id,
          source: this.incomeDeclerationForm.get('source')?.value,
          income: this.incomeDeclerationForm.get('income')?.value,
          category_id : this.data?.data?.category_id,
          has_asset: this.incomeDeclerationForm.get('has_asset')?.value,
          frequency: this.incomeDeclerationForm.get('frequency')?.value,
          main_classification: this.incomeDeclerationForm.get('main_classification')?.value,
          sub_classification: this.incomeDeclerationForm.get('sub_classification')?.value
        }
      ]
    }

    this.incomeService.updateIncome(body).subscribe((response:any)=>{
      console.log('Update income response: ', response)

      this.dialogRef.close(response);
    })
  }

}
