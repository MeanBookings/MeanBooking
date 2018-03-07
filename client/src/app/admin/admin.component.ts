import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';
import { CommentService } from '../../services/comment.service';
import { MenuService } from '../../services/menu.service';
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
  comments: any;
  status: boolean;
  id: string;
  menu:Array<any> = []
  switch:boolean = false

  constructor(
    public calendar: CalendarService,
    public comment: CommentService,
    public menuService: MenuService
  ) {
  }

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
    this.menuService.getMenu().subscribe(menus => menus.forEach((menu)=> this.menu.push(menu)))
    this.comment.getComment().subscribe((comment) => this.comments = comment);
    console.log(this.menu)
  }

  getComments() {
    this.comment.getComment().subscribe((comment) => this.comments = comment);
  }

  changeCommentStatus(id, status) {
    if (status == "delete") {
      this.comment.deleteComment(id).subscribe((updated) => {
        console.log(updated.status)
        this.comment.getComment().subscribe((comment) => this.comments = comment);
      })
    } else {
      this.comment.editComment(id, status).subscribe((updated) => {
        console.log(updated.status)
        this.comment.getComment().subscribe((comment) => this.comments = comment);
      })
    }
    
  }

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
      this.message = result;
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

    this.calendar.updateDays(dates, this.dayConfig).subscribe(result => {
      this.message = result;
    })
  }
}