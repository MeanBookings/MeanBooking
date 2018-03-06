import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackBarProfileComponent } from './snack-bar-profile/snack-bar-profile.component';
import { UserService } from '../../services/user.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  switch = false;
  btntext: String = "Edit";
  password: String = "";
  currentUser: any;
  error: String;
  message: any = "";
  userBookings:Array<any>;

  @Output() outputcall = new EventEmitter<string>();

  constructor(
    public session: SessionService,
    public router: Router,
    public snackBar: MatSnackBar,
    public userService:UserService,
    public bookingsServ: BookingService
  ) {
    this.currentUser = this.session.getUser();
    this.userService.getUserBookings(this.session.getUser()._id).subscribe(bookings=>{
      this.userBookings=bookings.bookings;
    })
    
  }

  ngOnInit() {
  }

  edit() {
    if (this.switch) {
      this.btntext = "Edit"
      this.switch = !this.switch
      if (this.password != "") {
        this.currentUser.password = this.password;
      }
      let snackBarRef = this.snackBar.openFromComponent(SnackBarProfileComponent, {duration:2000});
      this.session.updateUser(this.currentUser).subscribe((res) => {
        this.message = res;
      })
    } else {
      this.btntext = "Update"
      this.message = ""
      this.switch = !this.switch
    }
  }


  changeBookingStatus(status, id) {
    if (status !== 'cancelled') {this.bookingsServ.updateBookings(status, id).catch(e => this.error = e).subscribe()} 
    else {this.deleteBooking(id)}
  }

  deleteBooking(id) {
    this.bookingsServ.deleteBookings(id)
      .catch(e => this.error = e)
      .subscribe(result => {
        this.outputcall.emit(); 
      });
  }
}
