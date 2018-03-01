import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  error: string;
  days: Array<any>;
  daysOrdered: Array<any>;
  constructor(public calendar: CalendarService) {
    this.calendar.getCurrentMonth().subscribe(month => {
      this.days = month;
      this.days.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      console.log(this.days)
    });
  }

  ngOnInit() { }

  getRange(a, b) {
    let startDate = moment(a._selected)
    let endDate = moment(b._selected)
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
    this.calendar.getDays(dates).subscribe(result => {
      this.days = result.map(e => e[0])
      console.log(this.days)
    })
  }
}
