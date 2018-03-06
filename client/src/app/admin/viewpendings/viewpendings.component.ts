import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'viewpendings',
  templateUrl: './viewpendings.component.html',
  styleUrls: ['./viewpendings.component.scss']
})
export class ViewpendingsComponent implements OnInit {
  @Input() pending;
  @Input() totalpending;
  
  constructor(){
  }


  ngOnInit(){
  }

  closePending() {
    this.pending = null
  }

}
