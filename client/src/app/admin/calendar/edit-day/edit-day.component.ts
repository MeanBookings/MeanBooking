import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from '../../../../services/calendar.service';

@Component({
  selector: 'editDay',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.scss']
})
export class EditDayComponent implements OnInit {
  @Input() day;
  switch = false;
  btntext: String = "Edit day";

  constructor(public calendar:CalendarService) { }
  
  ngOnInit() { }

  editDay() {
    if (this.switch) {
      this.btntext = "Update day"
      this.switch = !this.switch
      /* this.calendar.updateDays(this.currentUser)
        .catch(e => this.error = e)
        .subscribe(user => console.log(`Updated ${user.name}`)); */
    } else {
      this.btntext = "Edit day"
      this.switch = !this.switch
    }
  }
}
