import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  month:Array<any>;
  constructor(public calendar:CalendarService) { 
    this.calendar.getMonth().subscribe(month => {this.month = month;console.log(month)});
  }

  ngOnInit() {
  }

}
