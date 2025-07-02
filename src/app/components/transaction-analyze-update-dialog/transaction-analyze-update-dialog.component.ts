import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TransactionDetailsService } from '../../services/transaction-details.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-transaction-analyze-update-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatOption,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './transaction-analyze-update-dialog.component.html',
  styleUrl: './transaction-analyze-update-dialog.component.scss',
})
export class TransactionAnalyzeUpdateDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<TransactionAnalyzeUpdateDialogComponent>);
  updateAnalysisDetails!: FormGroup;
  mainClassifications: any[] = [];
  subClassifications: any[] = [];
  categoryId : any;
  mainClassificationsLoaded:boolean=false;
  subClassification : any;
  loader  = signal<boolean>(false);

  constructor(private analysisService: TransactionDetailsService) {}

  ngOnInit(): void {
    this.getMainClassifications();

    this.updateAnalysisDetails = new FormGroup({
      main_classifications: new FormControl(null, Validators.required),
      sub_classifications: new FormControl(null, Validators.required),
    });

  }

  getMainClassifications() {
    this.mainClassificationsLoaded = false;

    this.analysisService.getMainClassifications().subscribe((response: any) => {
      const items = response.data.items;
      this.mainClassifications = items.filter(
        (item: any, index: number, self: any[]) => {
          return (
            item.main_classification &&
            self.findIndex(
              (other) => other.main_classification === item.main_classification
            ) === index
          );
        }
      );
      this.mainClassificationsLoaded = true
      console.log('Main-Classification-Items: ', this.mainClassifications);
    });
  }

  onClassificationChange() {

    const mainClassification = this.updateAnalysisDetails.get(
      'main_classifications'
    )?.value;
    this.subClassification = [];

    console.log('Main Classification: ', mainClassification);
    console.log('Sub Classification: ', this.subClassification);

    if(mainClassification){
      this.analysisService
      .getSubClassifications(mainClassification)
      .subscribe((response: any) => {
        console.log('Sub-Classifications: ', response);
        this.subClassifications = response.data;
      });
    }
  }

  onUpdate(){
    this.loader.update(()=>true);
    console.log('Main Classification: ', this.updateAnalysisDetails.get('main_classifications')?.value);
    console.log('Sub Classification: ', this.updateAnalysisDetails.get('sub_classifications')?.value)
    const body = {
      transaction_id : this.analysisService.transaction_id,
      category_update : {
        update_type : "classification",
        main_classification : this.updateAnalysisDetails.get('main_classifications')?.value,
        sub_classification : this.updateAnalysisDetails.get('sub_classifications')?.value
      },
      manually_overridden : true
    }
    this.analysisService.updateAnalysis(body).subscribe((response:any)=>{
      console.log('Update Analysis response: ', response);
      this.loader.update(()=>false);
      this.dialogRef.close(response);
    })
  }

  onCancel(){
    this.dialogRef.close('');
  }
}
