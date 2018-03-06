import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import * as moment from 'moment';
import { OwlModule } from 'ng2-owl-carousel';
import { CommentService } from '../../services/comment.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class HomeComponent implements OnInit {
  constructor(public comment: CommentService) { }

  comments: any;
  lat: number = 40.4334432;
  lng: number = -3.6555023;
  zoom: number = 18;
  ngOnInit() {
    this.comment.getComment().subscribe((comment) => this.comments = comment);
  }




}
