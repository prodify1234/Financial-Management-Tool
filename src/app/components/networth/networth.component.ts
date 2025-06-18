import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Chart, registerables } from 'chart.js';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
Chart.register(...registerables);

@Component({
  selector: 'app-networth',
  imports: [MatButtonModule, CommonModule, MatExpansionModule, MatSelectModule, MatOptionModule, MatFormFieldModule],
  templateUrl: './networth.component.html',
  styleUrl: './networth.component.scss',
})
export class NetworthComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart', { static: true })
  linechart!: ElementRef<HTMLCanvasElement>;


  @ViewChild('expenseBarChart', { static: true })
  expenseBarChart!: ElementRef<HTMLCanvasElement>;


  @ViewChild('categoryDoNut', { static: true })
  categoryDoNut!: ElementRef<HTMLCanvasElement>;


  constructor() {
    // this.getLineChart()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.getLineChart();
    this.getBarChart();
    this.categoryDoNutChart();
    // Called after ngOnInit when the component's view has been initialized.
    // Add 'implements AfterViewInit' to the class
  }

  getLineChart() {
    console.log(this.linechart);
    const lineChart = this.linechart.nativeElement;
    let data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Dataset #1",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 20, 81, 56, 55, 40, 30, 30, 30, 60, 13],
      }]
    };

    let options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          grid: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }


    let config: any = {
      type: 'line',
      data: data,
      options: options,
    };
    new Chart(lineChart, config);
  }

  getBarChart() {
    const barchart = this.expenseBarChart.nativeElement;
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: 'Income',
          data: [5000, 6000, 5500, 7000, 8000, 7500, 8900, 1000, 1111, 1234, 1111, 1111],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Expenses',
          data: [5000, 6000, 5500, 7000, 8000, 7500, 8900, 1000, 1111, 1234, 1111, 1111],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }
      ]
    };

    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    new Chart(barchart, config);
  }


  categoryDoNutChart() {
    const doNutChart = this.categoryDoNut.nativeElement;
    const data = {
      labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
      datasets: [{
        label: 'Category Expenses',
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        hoverOffset: 4
      }]
    };

    const config: any = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Category Expenses'
          }
        }
      },
    };
    new Chart(doNutChart, config);
  }
}



