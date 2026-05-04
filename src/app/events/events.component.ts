import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  paginatedEvents: any[] = [];

  categories: any[] = [];

  searchTerm = '';
  selectedCategory = '';

  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadCategories();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data: any[]) => {
        this.events = data;
        this.filteredEvents = data;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Erreur chargement events :', err);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur chargement catégories :', err);
      }
    });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter((event) => {
      const matchesSearch =
        !this.searchTerm ||
        event.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        !this.selectedCategory ||
        String(event.category_id) === String(this.selectedCategory);

      return matchesSearch && matchesCategory;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage) || 1;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePagination();
  }
}