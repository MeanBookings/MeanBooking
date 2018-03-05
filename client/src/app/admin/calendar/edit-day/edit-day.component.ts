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
      //he cambiado el updatedays, por un updateday con un solo parametro, en vez de dos como el days
      this.calendar.updateDay([this.day])
        .catch(e => this.error = e)
        .subscribe(newDay => {
          this.day=newDay;
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
