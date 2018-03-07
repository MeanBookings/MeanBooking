import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material
import { MatTooltipModule, MatSlideToggleModule,MatSelectModule, MatIconModule, MatButtonModule, MatCheckboxModule,MatDividerModule, MatExpansionModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSliderModule, MAT_DATE_LOCALE, MatMenuModule, MatSnackBar, MatSnackBarModule, MatSnackBarContainer } from '@angular/material';
//routes
import { routes } from './routes';
import { RouterModule } from '@angular/router';
//locale
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
//maps
import { AgmCoreModule } from '@agm/core';
//components
import { LoginComponent } from './header/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './header/signup/signup.component';
import { LogoutComponent } from './header/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { BookingformComponent } from './home/bookingform/bookingform.component';
//services
import { UserService } from '../services/user.service'
import { BookingService } from '../services/booking.service';
import { CalendarService } from '../services/calendar.service';
import { AdminGuardService } from '../services/adminguard.service';
import { SessionService } from '../services/session.service';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { ArraySortPipe } from '../pipes/order.pipe';
import { EditDayComponent } from './admin/calendar/edit-day/edit-day.component';
import { UserGuardService } from '../services/userguard.service';
import { SnackBarComponent } from './home/bookingform/snack-bar/snack-bar.component';
import { SnackBarProfileComponent } from './profile/snack-bar-profile/snack-bar-profile.component';
import { ViewBookingsComponent } from './admin/calendar/view-bookings/view-bookings.component';
import { ViewpendingsComponent } from './admin/viewpendings/viewpendings.component'
import { CommentService } from '../services/comment.service';
import { MenuService } from '../services/menu.service';

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
    CalendarComponent,
    FilterPipe,
    ArraySortPipe,
    EditDayComponent,
    SnackBarComponent,
    SnackBarProfileComponent,
    ViewBookingsComponent,
    ViewpendingsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSlideToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqZbiAa2oZ5vm3ec6BC9UiFto6uZgb-cw'
    }),
  ],
  entryComponents: [SnackBarComponent, BookingformComponent, SnackBarProfileComponent, ProfileComponent],
  providers: [MenuService, CommentService, UserService, SessionService, BookingService, AdminGuardService, CalendarService, UserGuardService, { provide: LOCALE_ID, useValue: "es-ES" }],
  bootstrap: [AppComponent]
})
export class AppModule { }

