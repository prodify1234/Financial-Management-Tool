import { AfterViewInit, ElementRef, ViewChild, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-networth-trends',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './networth-trends.component.html',
  styleUrl: './networth-trends.component.scss'
})
export class NetworthTrendsComponent implements AfterViewInit {
  @ViewChild('barChartCanvas', { static: true }) barChartCanvas!: ElementRef;

  ngAfterViewInit(): void {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Child Care',
          'House Groceries',
          'HNI Entity Misc',
          'Own Business Misc',
          'Other Categories',
        ],
        datasets: [
          {
            label: 'Actual',
            data: [500, 800, 300, 450, 600],
            backgroundColor: '#3395BC',
            borderColor: '#3395BC',
            borderWidth: 1,
          },
          {
            label: 'Projected',
            data: [550, 750, 350, 500, 650],
            backgroundColor: '#4CB7C3',
            borderColor: '#4CB7C3',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (₹)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Expense Categories',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Actual vs Projected Expenses by Category',
          },
        },
      },
    });
  }
}
