import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  error: string;
  constructor(public session: SessionService, public router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.session.logout()
      .catch(e => this.error = e)
      .subscribe(() => this.router.navigate(['/']));
  }
}
