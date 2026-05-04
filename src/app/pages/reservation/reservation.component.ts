import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  eventId: string | null = null;
  user: any = null;
  event: any = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');

    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe({
        next: (res: any) => {
          this.event = res.event;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Impossible de charger les détails de l’événement';
        }
      });
    }
  }

  confirmReservation(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.user || !this.user.id) {
      this.errorMessage = 'Utilisateur non connecté';
      return;
    }

    if (!this.event || this.event.capacity <= 0) {
      this.errorMessage = 'No places available for this event';
      return;
    }

    const data = {
      user_id: this.user.id,
      event_id: this.eventId
    };

    this.reservationService.reserve(data).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Reservation successful';

        if (this.event && res.remaining_capacity !== undefined) {
          this.event.capacity = res.remaining_capacity;
        }
      },
      error: (err) => {
        console.log(err);

        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Erreur pendant la réservation';
        }
      }
    });
  }
}