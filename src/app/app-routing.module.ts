import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyRegistrationsComponent } from './pages/my-registrations/my-registrations.component';
import { RegistrationsAdminComponent } from './pages/admin/registrations-admin/registrations-admin.component';
import { CategoriesAdminComponent } from './pages/admin/categories-admin/categories-admin.component';
import { EventsAdminComponent } from './pages/admin/events-admin/events-admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { EventFormAdminComponent } from './pages/admin/event-form-admin/event-form-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { adminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'my-registrations', component: MyRegistrationsComponent, canActivate: [authGuard] },
{ path: 'admin/dashboard', component: DashboardComponent, canActivate: [adminGuard] },
{ path: 'admin/events', component: EventsAdminComponent, canActivate: [adminGuard] },
{ path: 'admin/categories', component: CategoriesAdminComponent, canActivate: [adminGuard] },
{ path: 'admin/registrations', component: RegistrationsAdminComponent, canActivate: [adminGuard] },
{ path: 'admin/events/create', component: EventFormAdminComponent, canActivate: [adminGuard] },
{ path: 'admin/events/edit/:id', component: EventFormAdminComponent, canActivate: [adminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}