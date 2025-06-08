import { Component, inject, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-breadcrumps',
  imports: [MatIconModule],
  templateUrl: './breadcrumps.component.html',
  styleUrl: './breadcrumps.component.scss'
})
export class BreadcrumpsComponent implements OnInit {
  
   breadCrumpList : any = [];
  /** Dependencies */
  private route = inject(ActivatedRoute);
  private router = inject(Router)



  constructor() {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.pathFromRoot.forEach((route) => {
      this.breadCrumpList.push(route.snapshot.routeConfig?.path)
    })
  }

  onItemClick(item: string) {
    this.router.navigate([`/home/${item}`]);
  }

  onHome(){
      this.router.navigate(['/home/dashboard'])
  }
 
}
