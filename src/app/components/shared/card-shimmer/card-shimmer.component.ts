import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-shimmer',
  imports: [CommonModule],
  templateUrl: './card-shimmer.component.html',
  styleUrl: './card-shimmer.component.scss'
})
export class CardShimmerComponent {
  @Input() width: string = '300px';
  @Input() height: string = '200px';
  @Input() noOfLines: number = 2;
}
