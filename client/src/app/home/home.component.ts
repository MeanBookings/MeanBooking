import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import * as moment from 'moment';
import { CommentService } from '../../services/comment.service';
declare var $;

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
    this.comment.getComment().subscribe((comment) => {
      this.comments = comment;
      this.callJQuery();
    });

  }

  callJQuery() {
    $(document).ready(() => {
      $('.owl-carousel').owlCarousel({items:1,dots:true,center:true,autoplay:true,autoplaySpeed:700,autoplayHoverPause:true,loop:true})
    });
  }

}
