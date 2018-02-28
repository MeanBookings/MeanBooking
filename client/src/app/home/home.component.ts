import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import * as moment from 'moment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class HomeComponent implements OnInit {
  constructor() { }

 ngOnInit() {
 }

}
