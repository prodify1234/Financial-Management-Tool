import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OnInit } from '@angular/core';
import { AssetDeclerationService } from '../../services/asset-decleration.service';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-asset-create-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatInput,
    MatProgressBarModule,
  ],
  templateUrl: './asset-create-dialog.component.html',
  styleUrl: './asset-create-dialog.component.scss',
})
export class AssetCreateDialogComponent implements OnInit {
  assetCreationForm!: FormGroup;
  private assetService = inject(AssetDeclerationService);
  assetTypes: any[] = [];
  categoryTypes: any[] = [];
  isUnitRupee: boolean = false;
  readonly dialogRef = inject(MatDialogRef<AssetCreateDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  loader = signal<boolean>(false);
  asset_type: any;

  ngOnInit(): void {
    this.getAssetTypes();

    if (this.data && this.data.type === 'add') {
      this.assetCreationForm = new FormGroup({
        asset_type: new FormControl(),
        category_type: new FormControl(),
        units: new FormControl(),
        quantity: new FormControl(),
        purchase_value: new FormControl(),
        current_value: new FormControl(),
        purchase_date: new FormControl(),
        expected_ROI: new FormControl(),
        description: new FormControl(),
      });
    } else if (this.data && this.data.type === 'edit') {
      console.log('Data: ', this.data);
      const asset_type = this.data.data.asset_type;

      this.assetService.getAssetTypes().subscribe((response: any) => {
        this.assetTypes = response.data;

        const matchedAsset = this.assetTypes.find(
          (asset: any) => asset.asset_type === this.data?.data?.asset_type
        );

        if (matchedAsset) {
          this.assetCreationForm.patchValue({
            asset_type: matchedAsset,
          });
        }
      });

      this.assetCreationForm = new FormGroup({
        asset_id: new FormControl({
          value: this.data?.data?.id,
          disabled: false,
        }),
        asset_type: new FormControl({ value: null, disabled: true }),
        category_type: new FormControl({ value: null, disabled: true }),
        units: new FormControl({
          value: this.data?.data?.units,
          disabled: true,
        }),
        quantity: new FormControl({
          value: this.data?.data?.quantity,
          disabled: false,
        }),
        purchase_value: new FormControl({
          value: this.data?.data?.purchase_value,
          disabled: false,
        }),
        current_value: new FormControl({
          value: this.data?.data?.current_value,
          disabled: false,
        }),
        purchase_date: new FormControl({
          value: this.data?.data?.purchase_date,
          disabled: false,
        }),
        expected_ROI: new FormControl({
          value: this.data?.data?.expected_roi,
          disabled: false,
        }),
        description: new FormControl({
          value: this.data?.data?.description,
          disabled: false,
        }),
      });

      this.assetService
        .getCategoryTypes(asset_type)
        .subscribe((categories: any) => {
          this.categoryTypes = categories.data;

          const matchedCategory = this.categoryTypes.find(
            (cat: any) => cat.display_name === this.data.data.category_type
          );

          if (matchedCategory) {
            console.log('Matched category: ', matchedCategory);
            this.assetCreationForm.patchValue({
              category_type: matchedCategory,
            });
          }
        });
    }

    if (this.assetCreationForm) {
      this.assetCreationForm.get('units')?.valueChanges.subscribe((value) => {
        if (value === 'rupees') {
          this.assetCreationForm.get('quantity')?.disable();
        } else {
          this.assetCreationForm.get('quantity')?.enable();
        }
      });
    }
  }

  constructor() {}

  getAssetTypes() {
    this.assetService.getAssetTypes().subscribe((response: any) => {
      console.log('Asset Types: ', response);

      this.assetTypes = response.data;
    });
  }

  selectCategoryTypes(event: any) {
    console.log('Event: ', event);
    console.log('asset_id: ', this.assetCreationForm.get('asset_id')?.value);

    this.asset_type = event.value.asset_type;

    this.assetService
      .getCategoryTypes(this.asset_type)
      .subscribe((response: any) => {
        console.log('Category Types: ', response);

        this.categoryTypes = response.data;
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddAsset() {
    this.loader.update(() => true);
    console.log('Selected Asset type: ', this.assetCreationForm.value);
    const selectedAsset = this.assetCreationForm.get('asset_type')?.value;
    const selectedCategory = this.assetCreationForm.get('category_type')?.value;
    const units = this.assetCreationForm.get('units')?.value;
    const quantity = this.assetCreationForm.get('quantity')?.value;
    const purchase_value = this.assetCreationForm.get('purchase_value')?.value;
    const current_value = this.assetCreationForm.get('current_value')?.value;
    const purchase_date = this.assetCreationForm.get('purchase_date')?.value;
    const expected_ROI = this.assetCreationForm.get('expected_ROI')?.value;
    const description = this.assetCreationForm.get('description')?.value;

    const body = {
      asset_type: selectedAsset.asset_type,
      asset_class_id: selectedAsset.id,
      category_type: selectedCategory.display_name,
      category_id: selectedCategory.id,
      unit_type: units,
      quantity: quantity,
      purchase_value: purchase_value,
      current_value: current_value,
      purchase_date: purchase_date,
      expected_ROI: expected_ROI,
      description: description,
    };
    console.log('Body: ', body);
    this.assetService.addAsset(body).subscribe((response: any) => {
      console.log('Add Assets: ', response);

      this.loader.update(() => false);
      this.dialogRef.close(response);
    });
  }

  onUpdateAsset() {
    this.loader.update(() => true);
    console.log(
      'Selected Asset type for update: ',
      this.assetCreationForm.value
    );

    const selectedAsset = this.assetCreationForm.get('asset_type')?.value;
    const selectedCategory = this.assetCreationForm.get('category_type')?.value;

    const body = {
      asset_type: selectedAsset.asset_type,
      category_id: selectedCategory.id,
      description: this.assetCreationForm.get('description')?.value,
      purchase_date: this.assetCreationForm.get('purchase_date')?.value,
      purchase_value: this.assetCreationForm.get('purchase_value')?.value,
      current_value: this.assetCreationForm.get('current_value')?.value,
      expected_roi: this.assetCreationForm.get('expected_ROI')?.value,
    };

    const assetId = this.assetCreationForm.get('asset_id')?.value;

    this.assetService.updateAsset(assetId, body).subscribe((response: any) => {
      console.log('response: ', response);

      this.loader.update(() => false);
      this.dialogRef.close(response);
    });
  }
}
