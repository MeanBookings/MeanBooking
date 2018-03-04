import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {
  @Input() bookings;
  constructor() { }

  ngOnInit() {
  }

}
