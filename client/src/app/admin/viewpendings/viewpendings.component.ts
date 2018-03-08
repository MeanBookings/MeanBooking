import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'viewpendings',
  templateUrl: './viewpendings.component.html',
  styleUrls: ['./viewpendings.component.scss']
})
export class ViewpendingsComponent implements OnInit {
  @Input() pending;
  @Input() pendingsB;
  @Input() totalpending;
  @Output() outputcall = new EventEmitter<string>();
  constructor(public bookingsServ: BookingService) {
  }
  error: String;

  ngOnInit() {
  }

  closePending() {
    this.pending = null
  }

  changeBookingStatus(status, id) {
    if (status !== 'cancelled') { 
      this.bookingsServ.updateBookings(status, id)
      .catch(e => this.error = e)
      .subscribe(() =>{this.outputcall.emit()})
    }
    else { this.deleteBooking(id) }
  }

  deleteBooking(id) {
    this.bookingsServ.deleteBookings(id)
      .catch(e => this.error = e)
      .subscribe(result => {
        this.outputcall.emit();
      });
  }

}
