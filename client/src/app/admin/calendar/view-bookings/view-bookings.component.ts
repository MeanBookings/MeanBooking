import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarService } from '../../../../services/calendar.service';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {
  @Input() day;
  @Input() bookings;
  @Output() outputcall = new EventEmitter<string>();
  switch = false;
  btntext: String = "Edit booking";
  error: String;
  constructor(public calendar:CalendarService, public bookingsServ:BookingService) { }

  ngOnInit() {
    this.switch = false;
    this.btntext = "Edit booking"
  }
  editBooking() {
    if (this.switch) {
      this.btntext = "Update booking"
      this.switch = !this.switch
      this.bookingsServ.updateBookings(this.bookings)
        .catch(e => this.error = e)
        .subscribe(newBookings => {
          this.bookings=newBookings;
          this.outputcall.emit();
          this.closeBookings();
        });
    } else {
      this.btntext = "Edit day"
      this.switch = !this.switch
    }
  }
  closeBookings(){
    this.bookings=null
  }

}
