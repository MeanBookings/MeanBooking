import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any;
  envelope: Array<any>;
  emailText:String = "";
  constructor(public profile: UserService) { }

  ngOnInit() {
    this.profile.getUsers().subscribe((usersGet) => this.users = usersGet)
    this.envelope = []
  }

  deleteUser(id) {
    this.profile.deleteUser(id).subscribe(() => {
      this.profile.getUsers().subscribe((usersGet) => this.users = usersGet)
    })
  }

  makeMeAdmin(id) {
    this.profile.makeAdmin(id).subscribe(()=>{
      this.profile.getUsers().subscribe((usersGet) => this.users = usersGet)
    })
  }

  selectedForEmail(email) {
    if (this.envelope.includes(email)) {
      this.envelope.splice(this.envelope.indexOf(email), 1)
      console.log(this.envelope)
    } else {
      this.envelope.push(email)
      console.log(this.envelope)
    }
  }

  sendMassiveEmail(){
    this.profile.sendMassiveEmail(this.envelope,this.emailText).subscribe(()=>{
      this.emailText=""
      this.envelope=[]
      this.profile.getUsers().subscribe((usersGet) => this.users = usersGet)
     })
  }
}
