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
  currentMonthDay:Number=moment().date()
  daysInCurrentMonth:Number=moment().daysInMonth();
  currentMonth:number=moment().month();
  currentYear=moment().year();
  actualMonthInCalendar:number=0;
  constructor(public calendar: CalendarService) {}

  ngOnInit() { 
    this.calendar.getCurrentMonth(this.currentMonthDay,this.daysInCurrentMonth).subscribe(month => {
      this.days = month;
      this.days.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      //for para completar días por delante del mes hasta llegar al lunes (CON MANU y PAPU)
      let firstDay=new Date(this.days[0].date)
      for(let i=1;i<=new Date(firstDay).getDay()-1;i++){
        let date = new Date()
        date.setDate(firstDay.getDate()-i)
        this.days.unshift({date:date})
      }
    });
  }

  changeMonth(param){
    this.currentMonth;
    console.log('prev clicked')
    this.currentMonth=this.currentMonth+param;
    if(this.currentMonth<0) {this.currentYear=this.currentYear-1; this.currentMonth=11}
    if(this.currentMonth>11) {this.currentYear=this.currentYear+1; this.currentMonth=0}
    console.log(this.currentMonth,this.currentYear)
    this.calendar.changeCurrentMonth(this.currentMonth,this.currentMonth).subscribe(month => {
      console.log(month)
       this.days = month;
      /* this.days.sort(function (a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });  */
    });
  }
 /*  nextMonth(){
    console.log('next clicked')
  } */
/*   getRange(a, b) {
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
      //console.log(result)
      return this.days = result.map(e => e[0])
      //console.log(this.days)
    })
  } */

}
