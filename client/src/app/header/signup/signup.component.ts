import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';
declare var $;

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name: string;
  password: string;
  email:string;
  phone: string;
  error: string;
  visible: boolean=false;

  constructor(public session: SessionService) { }

  ngOnInit() {
  }

  signup() {
    this.session.signup(this.name, this.password, this.email, this.phone)
      .catch(e => this.error = e)
      .subscribe((user)=>{
        if(typeof(user)=='object')$('#signupModal').modal('hide')
      });
  }

}
