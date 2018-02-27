import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
<<<<<<< HEAD
  styleUrls: ['./login-form.component.scss']
=======
  styleUrls: ['./login-form.component.css']
>>>>>>> adb77712eeadcbefea6cdb2872f5e0cea865834f
})
export class LoginFormComponent implements OnInit {

  username:string;
  password:string;
  error:string;
  constructor(public session:SessionService) { }

  ngOnInit() {
  }

  login(){
    this.session.login(this.username,this.password)
    .catch(e => this.error = e)
    .subscribe(user => console.log(`Welcome ${user.username}`));
  }

  signup(){
    this.session.signup(this.username,this.password)
    .catch(e => this.error = e)
    .subscribe();
  }

  logout(){
    this.session.logout()
    .catch(e => this.error = e)
    .subscribe();
  }

}
