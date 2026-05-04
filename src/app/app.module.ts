import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './shared/hero/hero.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyRegistrationsComponent } from './pages/my-registrations/my-registrations.component';

// Admin components only
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { EventsAdminComponent } from './pages/admin/events-admin/events-admin.component';
import { CategoriesAdminComponent } from './pages/admin/categories-admin/categories-admin.component';
import { RegistrationsAdminComponent } from './pages/admin/registrations-admin/registrations-admin.component';
import { AdminNavbarComponent } from './layout/admin-navbar/admin-navbar.component';

// Only add these Material modules now if needed
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EventFormAdminComponent } from './pages/admin/event-form-admin/event-form-admin.component';
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';





@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    EventDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ReservationComponent,
    ProfileComponent,
    MyRegistrationsComponent,
    EventFormAdminComponent,

 AdminNavbarComponent,
  AdminLoginComponent,
  DashboardComponent,
  EventsAdminComponent,
  CategoriesAdminComponent,
  RegistrationsAdminComponent,
  EventFormAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDividerModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }