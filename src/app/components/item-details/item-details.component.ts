import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FinancialItemsService } from '../../services/financial-items.service';
import { MatTableModule } from '@angular/material/table';
import { TableShimmerComponent } from '../shared/table-shimmer/table-shimmer.component';


export interface itemData {
  sub_classification : string;
  purchase_value : string;
  current_value : string;
  item_type : string;
  is_depreciating : string;
  interest_rate : string;
}
@Component({
  selector: 'app-item-details',
  imports: [MatButtonModule, MatTableModule, TableShimmerComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit {

  constructor(private router : Router, private route:ActivatedRoute, private financialService : FinancialItemsService){}

  allItems : any[] = [];
  accountSource : any[] = [];
  currentParams:any;
  loader  = signal<boolean>(false)

  tableDataColumns:string[]=[
    'sub_classification',
    'purchase_value',
    'current_value',
    'item_type',
    'is_depreciating',
    'interest_rate',
    'expected_roi'
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      if(params.heads && params.main_classifications){
        this.currentParams = {
          heads : params.heads,
          main_classifications : params.main_classifications
        }
        const body = {
          person_id : sessionStorage.getItem('personId'),
          heads : [params.heads],
          main_classifications : [params.main_classifications],
          display_name : params.display_name
        }

        this.getItemDetails(body);
      }
    })
  }


  getItemDetails(body:any){
    this.loader.update(()=>true);
    this.financialService.getItemDetails(body).subscribe((response:any)=>{
      console.log('4th Level Response: ', response);
      this.allItems = response.data.display_name_groups[0].items;
      this.accountSource = this.allItems.map((item:any)=>({
        sub_classification : item.sub_classification,
        purchase_value : item.purchase_value,
        current_value : item.current_value,
        item_type : item.item_type,
        is_depreciating : item.is_depreciating,
        interest_rate : item.interest_rate,
        expected_roi : item.expected_roi
      }))
      this.loader.update(()=>false);
    })
  }


  onBack(){
    console.log('4th level params: ', this.currentParams);
    this.router.navigate(['../item-details'], {
      relativeTo : this.route,
      queryParams : this.currentParams
    })
  }
}
