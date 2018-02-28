import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MatSelectModule, MatButtonModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule } from '@angular/material';


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
    AdminComponent
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
    CalendarModule.forRoot()
  ],
  providers: [SessionService, BookingService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
