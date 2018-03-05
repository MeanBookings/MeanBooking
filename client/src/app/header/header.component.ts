import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Mean Booking';
  searchingPendings:any=[];
  constructor(
    public session:SessionService,
    public books:BookingService) { }

  ngOnInit() {
  }

  pendingBookings(){
    this.books.getPendings().subscribe((a)=>console.log(a))
  }
}
