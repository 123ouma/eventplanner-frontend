import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: any = null;
  loading = false;
  errorMessage = '';

  private freePaidChart: Chart | null = null;
  private registrationsChart: Chart | null = null;
  private availabilityChart: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.dashboardService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;

        setTimeout(() => {
          this.renderCharts();
        }, 0);
      },
      error: (err) => {
        console.error('Erreur chargement dashboard :', err);
        this.errorMessage = 'Impossible de charger les statistiques du dashboard.';
        this.loading = false;
      }
    });
  }

  renderCharts(): void {
    this.destroyCharts();

    this.freePaidChart = new Chart('freePaidChart', {
      type: 'doughnut',
      data: {
        labels: ['Free Events', 'Paid Events'],
        datasets: [
          {
            data: [
              this.stats?.free_events || 0,
              this.stats?.paid_events || 0
            ],
            backgroundColor: ['#6c63ff', '#ff6584'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    this.registrationsChart = new Chart('registrationsChart', {
      type: 'bar',
      data: {
        labels: this.stats?.registrations_by_event?.map((item: any) => item.title) || [],
        datasets: [
          {
            label: 'Registrations',
            data: this.stats?.registrations_by_event?.map((item: any) => item.registrations_count) || [],
            backgroundColor: '#6c63ff',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });

    this.availabilityChart = new Chart('availabilityChart', {
      type: 'pie',
      data: {
        labels: ['Available Events', 'Sold Out Events'],
        datasets: [
          {
            data: [
              this.stats?.available_events || 0,
              this.stats?.sold_out_events || 0
            ],
            backgroundColor: ['#22c55e', '#ef4444'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  destroyCharts(): void {
    if (this.freePaidChart) {
      this.freePaidChart.destroy();
      this.freePaidChart = null;
    }

    if (this.registrationsChart) {
      this.registrationsChart.destroy();
      this.registrationsChart = null;
    }

    if (this.availabilityChart) {
      this.availabilityChart.destroy();
      this.availabilityChart = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }
}