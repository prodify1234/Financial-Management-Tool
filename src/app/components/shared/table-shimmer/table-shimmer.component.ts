import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-shimmer',
  imports: [CommonModule],
  templateUrl: './table-shimmer.component.html',
  styleUrl: './table-shimmer.component.scss'
})
export class TableShimmerComponent {
  @Input() rows : number = 4;
  @Input() columns: number = 4;
  constructor(){

  }

}
