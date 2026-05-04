import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdminPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAdminPage = this.router.url.startsWith('/admin');

    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.isAdminPage = event.urlAfterRedirects.startsWith('/admin');
      });
  }
}