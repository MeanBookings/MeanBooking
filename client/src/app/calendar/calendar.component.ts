import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  month:Array<any>;
  constructor(public calendar:CalendarService) { 
    this.calendar.getCurrentMonth().subscribe(month => {this.month = month;console.log(month)});
    //this.getRange(moment(),moment().add(1,'month'))
    
  }

  ngOnInit() {
  }

  error: string;

  days:Array<any>;


  getRange(a, b) {
    let startDate = a._selected
    let endDate = b._selected
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    this.calendar.getDays(dates).subscribe(result => this.days = result)
  }
}
