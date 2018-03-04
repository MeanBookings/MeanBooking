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
  message: any;
  dayConfig: object = {}

  constructor(public calendar: CalendarService) { }

  ngOnInit() {
    this.dayConfig = {
      status: "open",
      shift: [
        { hour: "12:00", current: 20 }, { hour: "12:30", current: 20 }, { hour: "13:00", current: 20 }, { hour: "13:30", current: 20 },
        { hour: "14:00", current: 20 }, { hour: "14:30", current: 20 }, { hour: "15:00", current: 20 }, { hour: "15:30", current: 20 },
        { hour: "16:00", current: 20 }, { hour: "16:30", current: 20 }, { hour: "17:00", current: 20 }, { hour: "17:30", current: 20 },
        { hour: "18:00", current: 20 }, { hour: "18:30", current: 20 }, { hour: "19:00", current: 20 }, { hour: "19:30", current: 20 },
        { hour: "20:00", current: 20 }, { hour: "20:30", current: 20 }, { hour: "21:00", current: 20 }, { hour: "21:30", current: 20 },
        { hour: "22:00", current: 20 }, { hour: "22:30", current: 20 }, { hour: "23:00", current: 20 }, { hour: "23:30", current: 20 },
      ]
    }
  }

  createDays(a, b) {
    // console.log(a)
    // console.log(b)
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
      this.message = result;
      console.log(result)
    })
  }

  updateDays(a, b) {
    let startDate = a._selected;
    let endDate = b._selected;
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
    console.log(dates)
    // console.log(this.dayConfig)
    this.calendar.updateDays(dates, this.dayConfig).subscribe(result => {
      this.message = result;
      console.log(result)
    })
  }
}