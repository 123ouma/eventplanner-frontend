import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  admin: any = null;

  constructor(private router: Router) {
    const data = localStorage.getItem('admin_user');
    this.admin = data ? JSON.parse(data) : null;
  }

logout(): void {
  localStorage.removeItem('admin_user');
  localStorage.removeItem('role');

  this.router.navigate(['/login']); // يرجع للـ login العادي
}
}