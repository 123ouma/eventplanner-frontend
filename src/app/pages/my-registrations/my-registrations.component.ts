import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-my-registrations',
  templateUrl: './my-registrations.component.html',
  styleUrls: ['./my-registrations.component.css']
})
export class MyRegistrationsComponent implements OnInit {

  registrations: any[] = [];
  user: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    if (this.user) {
      this.reservationService.getMyRegistrations(this.user.id).subscribe({
        next: (res) => {
          this.registrations = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  cancelReservation(id: number): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.reservationService.cancelReservation(id).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.registrations = this.registrations.filter(reg => reg.id !== id);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error while cancelling reservation';
      }
    });
  }
}