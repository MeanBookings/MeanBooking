import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  error: string;
  days: Array<any>;

  constructor(public calendar: CalendarService) { }

  ngOnInit() {}

  createDays(a, b) {
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
    this.calendar.createDays(dates).subscribe(result => {
     /*  this.days = result.map(e => e[0]) */
      console.log(result)
    })
  }
}
