import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'editDay',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.scss']
})
export class EditDayComponent implements OnInit {
  @Input() day;
  constructor() {}

  ngOnInit() {}

}
