import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pending: any;
  popup: any;
  title = 'Pizza!';
  searchingPendings: any = [];
  constructor(
    public session: SessionService,
    public books: BookingService) {
    this.books.sendPendings.subscribe((c) => {
      this.pending = c.length
    })
  }

  ngOnInit() {
    this.books.getPendings().subscribe((a) => {
      this.popup = []
      console.log(a)
      return this.pending = a.length
    })
  }

  pendingBookings() {
    this.books.getPendings().subscribe((a) => {
      this.popup = a
      return this.pending = a.length;
    })
  }
}
