import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import Chart from 'chart.js/auto';

interface Months {
  value: string;
  viewValue: string;
}

interface Years {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cashflows',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './cashflows.component.html',
  styleUrl: './cashflows.component.scss'
})
export class CashflowsComponent implements AfterViewInit {
  months: Months[] = [
    {value: 'january-0', viewValue: 'January'},
    {value: 'february-1', viewValue: 'February'},
    {value: 'march-2', viewValue: 'March'},
    {value: 'april-3', viewValue: 'April'},
    {value: 'may-4', viewValue: 'May'},
    {value: 'june-5', viewValue: 'June'},
    {value: 'july-6', viewValue: 'July'},
    {value: 'august-7', viewValue: 'August'},
    {value: 'september-8', viewValue: 'September'},
    {value: 'october-9', viewValue: 'October'},
    {value: 'november-10', viewValue: 'November'},
    {value: 'december-11', viewValue: 'December'}
  ];

  years: Years[] = [
    {value: '2025-0', viewValue: '2025'},
    {value: '2024-1', viewValue: '2024'}
  ]

actualAmount = 12000;
projectedAmount = 18000;
cashflowChart: Chart | undefined;
groupedChart!: Chart;
@ViewChild('cashflowChart') chartRef!: ElementRef;
@ViewChild('groupedChart') groupedChartRef!: ElementRef;

inflowChart!: Chart;
outflowChart!: Chart;
netChart!: Chart;


ngAfterViewInit() {
  const canvas = this.chartRef?.nativeElement;
  if (canvas) {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.cashflowChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Actual', 'Projected'],
          datasets: [{
            label: 'Amount ($)',
            data: [this.actualAmount, this.projectedAmount],
            backgroundColor: ['#3395BC', '#4CB7C3'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  }

  this.createGroupedBarChart();
}

createGroupedBarChart() {
    const ctx = this.groupedChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.groupedChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Inflow', 'Outflow', 'Net'],
          datasets: [
            {
              label: 'Actual',
              data: [17488, 12266, 5221],
              backgroundColor: '#3395BC'
            },
            {
              label: 'Projected',
              data: [18000, 13000, 5000],
              backgroundColor: '#4CB7C3'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Cashflow Category'
              }
            }
          }
        }
      });
    }
  }
}
