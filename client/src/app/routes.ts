import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '' }
];