import { Component, signal } from '@angular/core';
import { FinancialItemsHeaderComponent } from '../financial-items-header/financial-items-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FinancialItemsService } from '../../services/financial-items.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumpsComponent } from '../shared/breadcrumps/breadcrumps.component';

@Component({
  selector: 'app-item-head-details',
  imports: [
    FinancialItemsHeaderComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    BreadcrumpsComponent
  ],
  templateUrl: './item-head-details.component.html',
  styleUrl: './item-head-details.component.scss'
})
export class ItemHeadDetailsComponent implements OnInit{

  itemDetails: any[] = [];
  viewLevel : number = 1;
  loader = signal<boolean>(false);

  constructor(private financialItemsService : FinancialItemsService, private route:ActivatedRoute , private router:Router){

  }

  ngOnInit(): void {
     this.route.queryParams.subscribe((params:any)=>{
      console.log('Params: ', params);
      // console.log('Level 2 Params: ', params.heads);

      if(Object.keys(params).length <= 0){
        this.viewLevel = 1;
        const body = {
          person_id : sessionStorage.getItem('personId')
        }
        this.getItemHeads(body)
      }
      else if (Object.keys(params).length == 1){
        this.viewLevel = 2;
        if(params.heads){
          const body = {
            person_id : sessionStorage.getItem('personId'),
            heads : [params.heads]
          }
          this.getItemHeadDetails(body)
        }
      }
      else if(Object.keys(params).length > 1){
        this.viewLevel = 3;
        if(params.heads && params.main_classifications) {
          const body = {
            person_id : sessionStorage.getItem('personId'),
            heads : [params.heads],
            main_classifications : [params.main_classifications]
          }
          this.getClassificationItems(body);
        }
      }
    })
  }



    //NEW
  getItemHeads(body:any){
    this.loader.update(() => true);
    this.itemDetails = [];
    this.financialItemsService.getItemHeads(body).subscribe((response:any)=>{
      console.log('Item Heads: ', response);
      this.itemDetails = response.data.heads;

      console.log('Item Details: ', this.itemDetails);
      this.loader.update(() => false);
    })
  }

  getItemHeadDetails(body:any){
    this.loader.update(() => true);
    this.itemDetails = [];
    this.financialItemsService.getItemHeadDetails(body).subscribe((response:any)=>{
      console.log('Item Head details: ', response);
      this.itemDetails = response.data.main_classifications;

      console.log('Item Details: ', this.itemDetails);
      this.loader.update(() => false);

    })
  }

  getClassificationItems(body:any){
    this.loader.update(() => true);
    this.itemDetails = [];
    this.financialItemsService.getClassificationItems(body).subscribe((response:any)=>{
      console.log('Classification Items: ', response);
      this.itemDetails = response.data.main_classifications;

      console.log('Item Details: ', this.itemDetails)
      this.loader.update(() => false);
    })
  }


  // head click
  onClick(item:any){

    console.log('Level: ', this.viewLevel);
    console.log('Item: ', item)

    const currentParams : any = { ...this.route.snapshot.queryParams, display_name: item.display_name };

    if (this.viewLevel === 3) {
      this.router.navigate(['../items'], {
        relativeTo: this.route,
        queryParams : currentParams
      });
      return;
    }

    const params : any = {
      heads : currentParams['heads'] || item.head
    }

    if (currentParams['heads'] && !currentParams['main_classifications'] && item.main_classification) {
      params['main_classifications'] = item.main_classification;
    }

    this.router.navigate(['../item-details'], {relativeTo : this.route, queryParams: params});
  }

  onBack() {
    const currentParams = { ...this.route.snapshot.queryParams };
    const updatedParams: any = { ...currentParams };

    if (currentParams['main_classifications']) {
      delete updatedParams.main_classifications;
    } else if (currentParams['heads']) {
      delete updatedParams.heads;
    } else {
      return;
    }

    this.router.navigate(['../item-details'], {
      relativeTo: this.route,
      queryParams: updatedParams
    });
  }

}



