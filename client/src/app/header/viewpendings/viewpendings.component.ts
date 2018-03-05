import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'viewpendings',
  templateUrl: './viewpendings.component.html',
  styleUrls: ['./viewpendings.component.scss']
})
export class ViewpendingsComponent implements OnInit {

  pendings:any;
  constructor() {  this.pendings = []; }

  ngOnInit() {
  }

}
