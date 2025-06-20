import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FinancialItemsService } from '../../services/financial-items.service';

@Component({
  selector: 'app-item-details',
  imports: [MatButtonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit {

  constructor(private router : Router, private route:ActivatedRoute, private financialService : FinancialItemsService){}

  currentParams:any;

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
    this.financialService.getItemDetails(body).subscribe((response:any)=>{
      console.log('4th Level Response: ', response)
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
