import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackBarProfileComponent } from './snack-bar-profile/snack-bar-profile.component';

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
  message: any = "";

  constructor(public session: SessionService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.currentUser = this.session.getUser();
  }

  ngOnInit() {
  }

  edit() {
    if (this.switch) {
      this.btntext = "Edit"
      this.switch = !this.switch
      if (this.password != "") {
        this.currentUser.password = this.password;
      }
      let snackBarRef = this.snackBar.openFromComponent(SnackBarProfileComponent, {duration:2000});
      this.session.updateUser(this.currentUser).subscribe((res) => {
        this.message = res;
      })
    } else {
      this.btntext = "Update"
      this.message = ""
      this.switch = !this.switch
    }
  }
}
