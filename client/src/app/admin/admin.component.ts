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
  constructor(public calendar:CalendarService) { }

  ngOnInit() {
  }

  setRange(a, b) {
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
    this.calendar.getDays(dates).subscribe(result => {
      if (this.error) console.log(this.error)
    })
    //return dates;
  }
}
