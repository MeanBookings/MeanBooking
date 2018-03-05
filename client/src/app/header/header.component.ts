import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Mean Booking';
  searchingPendings: any = [];
  pending
  
  constructor(
    public session: SessionService,
    public books: BookingService) { 
      this.books.sendPendings.subscribe((c)=>{
        this.pending = c.length
        console.log(c)
      })
    }

  ngOnInit() {
    this.books.getPendings().subscribe((a) => {
      return this.pending = a.length
    })
  }

  pendingBookings(){
    console.log("a")
  }
}
