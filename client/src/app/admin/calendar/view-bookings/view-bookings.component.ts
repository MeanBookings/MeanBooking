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
  constructor(public calendar: CalendarService, public bookingsServ: BookingService) { }

  ngOnInit() {
    this.switch = false;
    this.btntext = "Edit booking"
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

  closeBookings() {
    this.bookings = null
  }


}
