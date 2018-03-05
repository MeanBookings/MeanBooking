import { Component, OnInit, Renderer } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  error: string;
  days: Array<any>;
  currentMonthDay: Number = moment().date()
  daysInCurrentMonth: Number = moment().daysInMonth();
  currentMonth: number = moment().month();
  currentMonthText: string = moment().month(this.currentMonth).format('MMMM');
  currentYear = moment().year();
  today = moment().format('L');
  theDay: Array<any>;
  weekDays: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  day: any;

  pending: number = 0;
  cancelled: number = 0;
  approved: number = 0;

  dayBookings: Array<any>;

  constructor(public calendar: CalendarService, private render: Renderer) { }

  ngOnInit() {
    this.calendar.getCurrentMonth().subscribe(month => {
      this.days = month.days;
      this.days.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
    });
  }

  changeMonth(param) {
    this.currentMonth = this.currentMonth + param;
    this.currentMonthText = moment().month(this.currentMonth).format('MMMM');
    if (this.currentMonth < 0) { this.currentYear = this.currentYear - 1; this.currentMonth = 11 }
    if (this.currentMonth > 11) { this.currentYear = this.currentYear + 1; this.currentMonth = 0 }
    this.calendar.changeCurrentMonth(this.currentMonth, this.currentYear).subscribe(month => {
      this.days = month;
      this.days.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
    });
  }

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
      return this.days = result.map(e => e[0])
    })
  }

  getDay(date) {
    this.calendar.getDay(date).subscribe(day => {
      this.theDay = day
    })
  }

  getDayBookings(date) {
    this.calendar.getDay(date).subscribe(dayBookings => {
      this.dayBookings = dayBookings
    })
  }

  reloadCalendar() {
    this.calendar.changeCurrentMonth(this.currentMonth, this.currentYear).subscribe(month => {
      this.days = month;
      this.days.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
    });
  }

}
