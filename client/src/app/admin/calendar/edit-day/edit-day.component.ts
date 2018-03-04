import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarService } from '../../../../services/calendar.service';

@Component({
  selector: 'editDay',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.scss']
})
export class EditDayComponent implements OnInit {
  @Input() day;
  @Output() outputcall = new EventEmitter<string>();
  switch = false;
  btntext: String = "Edit day";
  error: String;
  constructor(public calendar:CalendarService) { }
  
  ngOnInit() { 
    this.switch = false;
    this.btntext = "Edit day"
  }

  editDay() {
    if (this.switch) {
      this.btntext = "Update day"
      this.switch = !this.switch
      this.calendar.updateDays([this.day])
        .catch(e => this.error = e)
        .subscribe(day => {
          console.log(day)
          this.day=day;
          this.outputcall.emit();
          this.closeDay();
        });
    } else {
      this.btntext = "Edit day"
      this.switch = !this.switch
    }
  }
  closeDay(){
    this.day=null
  }
}
