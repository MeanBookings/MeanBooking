import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { SessionService } from '../services/session.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material
import { MatSelectModule, MatButtonModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MAT_DATE_LOCALE } from '@angular/material';


//calendar
import { CalendarModule } from 'angular-calendar';
//routes
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingService } from '../services/booking.service';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from '../services/adminguard.service';
import { UsersComponent } from './users/users.component';

import { BookingformComponent } from './bookingform/bookingform.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    LogoutComponent,
    ProfileComponent,
    BookingsComponent,
    AdminComponent,
    UsersComponent,
    
    BookingformComponent,
    //CommonModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [SessionService, BookingService, AdminGuardService,{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},{ provide: LOCALE_ID, useValue: "es-ES" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
