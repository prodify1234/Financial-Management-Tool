import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  imports: [MatButtonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {
  constructor(private router : Router, private route:ActivatedRoute){}
  onBack(){
    const currentParams = this.route.snapshot.queryParams;

    this.router.navigate(['../item-details'], {
      relativeTo : this.route,
      queryParams : currentParams
    })
  }
}
