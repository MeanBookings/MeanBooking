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
  numberPopup: any;
  i: number;
  title = "Avello's Trattoria";
  searchingPendings: any = [];
  constructor(
    public session: SessionService,
    public books: BookingService) {
    this.books.sendPendings.subscribe((c) => {
      this.pending = c.length
    })
  }

  ngOnInit() {
    
/*     this.books.getPendings().subscribe((a) => {
      console.log(a)
      return this.pending = a.length */
    this.i=0;
    this.books.getPendings().subscribe((a) => {
      a.forEach((b) => {
        b.books.forEach((c) => {
         if (c.status == "pending") {
           this.i++
         }
        })
     })
     console.log(a)
      return this.pending = this.i
    })
    
  }

  pendingBookings() {
    this.i = 0
    this.books.getPendings().subscribe((a) => {
      // console.log(a)
      a.forEach((b) => {
         b.books.forEach((c) => {
          if (c.status == "pending") {
            this.i++
          }
         })
      })
      this.popup = a
      this.numberPopup = this.i
      return this.pending = this.i;
    })
  }
}
