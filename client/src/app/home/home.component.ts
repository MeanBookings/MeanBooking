import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hours = [
    { value: '13:00', viewValue: '13:00' },
    { value: '14:00', viewValue: '14:00' },
    { value: '15:00', viewValue: '15:00' }
  ];
  constructor(public booking:BookingService) { }

  ngOnInit() {
  }

  sendBooking(bookingForm) {
    this.booking.placeBooking(bookingForm.value).subscribe(res => {})
  }


}
