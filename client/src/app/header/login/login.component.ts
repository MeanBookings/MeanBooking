import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name:string;
  password:string;
  error:string;
  visible: boolean = false;

  constructor(public session:SessionService) { }

  ngOnInit() {
  }

  login(){
    this.session.login(this.name,this.password)
    .catch(e => this.error = e)
      .subscribe(user => console.log(`Welcome ${user.name}`));
  }


}
