import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  switch = false;
  btntext: String = "Edit";
  password: String = "";
  currentUser: any;
  error: String;
  constructor(public session: SessionService,
    public router: Router) {
    this.currentUser = this.session.getUser();
  }

  ngOnInit() {
  }

  edit() {
    if (this.switch) {
      this.btntext = "Update"
      this.switch = !this.switch
      if (this.password != ""){
      this.currentUser.password = this.password;
      }
      console.log(this.currentUser)
      this.session.updateUser(this.currentUser)
        .catch(e => this.error = e)
        .subscribe(user => console.log(`Updated ${user.name}`));
    } else {
      this.btntext = "Edit"
      this.switch = !this.switch
    }
  }
}
