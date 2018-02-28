import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from '../services/adminguard.service';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: AdminComponent, canActivate: [AdminGuardService] },
    { path: 'bookings', component: BookingsComponent, canActivate: [AdminGuardService] },
    { path: 'users', component: UsersComponent, canActivate: [AdminGuardService] },
    { path: '**', redirectTo: '' }
];

