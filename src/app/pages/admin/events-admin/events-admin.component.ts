import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'title',
    'start_date',
    'end_date',
    'price',
    'capacity',
    'location',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private eventService: EventService) {}

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const search = filter.trim().toLowerCase();

          return (
            (data.title || '').toLowerCase().includes(search) ||
            (data.location || '').toLowerCase().includes(search) ||
            String(data.capacity || '').toLowerCase().includes(search) ||
            String(data.price || '').toLowerCase().includes(search)
          );
        };
      },
      error: (err) => {
        console.error('Erreur chargement events :', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEvent(id: number): void {
  const confirmed = confirm('Are you sure you want to delete this event?');
  if (!confirmed) return;

  this.eventService.deleteEvent(id).subscribe({
    next: () => {
      this.loadEvents();
    },
    error: (err) => {
      console.error('Erreur suppression event :', err);
      alert('Delete failed');
    }
  });
}
}