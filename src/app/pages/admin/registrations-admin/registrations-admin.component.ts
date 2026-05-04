import { Component, OnInit } from '@angular/core';
import { AdminRegistrationService } from 'src/app/services/admin-registration.service';

@Component({
  selector: 'app-registrations-admin',
  templateUrl: './registrations-admin.component.html',
  styleUrls: ['./registrations-admin.component.css']
})
export class RegistrationsAdminComponent implements OnInit {
  registrations: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private adminRegistrationService: AdminRegistrationService) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adminRegistrationService.getRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement registrations :', err);
        this.errorMessage = 'Impossible de charger les inscriptions.';
        this.loading = false;
      }
    });
  }

  deleteRegistration(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this registration?');
    if (!confirmed) return;

    this.adminRegistrationService.deleteRegistration(id).subscribe({
      next: () => {
        this.successMessage = 'Registration deleted successfully.';
        this.registrations = this.registrations.filter(r => r.id !== id);
      },
      error: (err) => {
        console.error('Erreur suppression registration :', err);
        this.errorMessage = 'Delete failed.';
      }
    });
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleString();
  }
}