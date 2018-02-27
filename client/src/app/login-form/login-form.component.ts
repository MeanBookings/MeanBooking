import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  name:string;
  password:string;
  error:string;
  constructor(public session:SessionService) { }

  ngOnInit() {
  }

  login(){
    this.session.login(this.name,this.password)
    .catch(e => this.error = e)
      .subscribe(user => console.log(`Welcome ${user.name}`));
  }

  signup(){
    this.session.signup(this.name,this.password)
    .catch(e => this.error = e)
    .subscribe();
  }

  logout(){
    this.session.logout()
    .catch(e => this.error = e)
    .subscribe();
  }

}
