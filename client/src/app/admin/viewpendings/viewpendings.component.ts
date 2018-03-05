import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'viewpendings',
  templateUrl: './viewpendings.component.html',
  styleUrls: ['./viewpendings.component.scss']
})
export class ViewpendingsComponent implements OnInit {
  @Input() pending;

   
  constructor(){
    console.log("hola")
  }

  ngOnInit(){}

  closePending() {
    this.pending = null
  }
}
