import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from '../services/adminguard.service';
import { UsersComponent } from './admin/users/users.component';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { UserGuardService } from '../services/userguard.service';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [UserGuardService] },
    { path: 'dashboard', component: AdminComponent, canActivate: [AdminGuardService] },
    { path: 'bookings', component: CalendarComponent, canActivate: [AdminGuardService] },
    { path: 'users', component: UsersComponent, canActivate: [AdminGuardService] },
    { path: '**', redirectTo: '' }
];

