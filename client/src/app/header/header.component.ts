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
  pendingsB:Array<any>=[];
  constructor(
    public session: SessionService,
    public books: BookingService) {
    this.books.sendPendings.subscribe((c) => {
      this.pending = c.length
    })
  }

  ngOnInit() {

    this.i = 0;
    this.books.getPendings().subscribe((a) => {
      a.forEach((b) => {
        b.books.forEach((c) => {
          if (c.status == "pending") {
            this.i++
          }
        })
      })
      return this.pending = this.i
    })

  }

  pendingBookings() {
<<<<<<< HEAD
    let temp = []
=======
    this.pendingsB=[];
>>>>>>> 96c8b26167084e8f03caaf3c7ab8f41c31f58638
    this.i = 0
    this.books.getPendings().subscribe((a) => {
      a.forEach((b) => {
        b.books.forEach((c) => {
          console.log(c)
          if (c.status == "pending") {
            temp.push(c)
              this.i++
            }
          })
        })
      this.popup = a
      this.pendingsB = [...temp]
      this.numberPopup = this.i
      return this.pending = this.i;
    })
  }
}
