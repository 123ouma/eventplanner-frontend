import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

event: any = null;
related: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (res: any) => {
          this.event = res.event;
    this.related = res.related || [];
        },
        error: (err) => {
          console.log('Erreur chargement event :', err);
        }
      });
    }
  }

  goToReservation(id: number): void {
    if (this.event && this.event.capacity > 0) {
      this.router.navigate(['/reservation', id]);
    }
  }
}