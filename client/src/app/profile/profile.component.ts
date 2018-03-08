import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookingService } from '../../services/booking.service';
import { CommentService } from '../../services/comment.service';
declare var $

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
  userBookings: Array<any>;
  userInfo: object;
  justAdmins:boolean=true;
  comment:any;
  content:any;
  valoration:any;
  userHasShowed:boolean=false;
  @Output() outputcall = new EventEmitter<string>();

  constructor(
    public session: SessionService,
    public router: Router,
    public userService: UserService,
    public bookingsServ: BookingService,
    public CommentServ: CommentService
  ) {
    this.currentUser = this.session.getUser();
    this.userService.getUserBookings(this.session.getUser()._id).subscribe(bookings => {
      this.userInfo = { name: bookings.name, email: bookings.email, phone: bookings.phone }
      this.userBookings = bookings.bookings;
      this.userBookings.forEach(b=>{if(b.status==='show')this.userHasShowed=true})
      console.log(this.userHasShowed)
    });
    if(this.session.getAdmin())this.justAdmins=false    
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
      // let snackBarRef = this.snackBar.openFromComponent(SnackBarProfileComponent, { duration: 2000 });
      this.session.updateUser(this.currentUser).subscribe((res) => {
        this.message = res;
      })
    } else {
      this.btntext = "Update"
      this.message = ""
      this.switch = !this.switch
      $('#profileModal').modal('show')

    }
  }


  changeBookingStatus(status, id) {
    if (status !== 'cancelled') { this.bookingsServ.updateBookings(status, id).catch(e => this.error = e).subscribe() }
    else { this.deleteBooking(id) }
  }

  deleteBooking(id) {
    this.bookingsServ.deleteBookings(id)
      .catch(e => this.error = e)
      .subscribe(result => {
        this.outputcall.emit();
      });
  }

  sendComment(user_Id,content,valoration) {
    this.comment = content;
    this.valoration = valoration;
    this.CommentServ.createComment(user_Id,content,valoration)
      .catch(e => this.error = e)
      .subscribe(result => {
        this.comment = ""
        this.valoration = 0
      });
  }

  //slider
  //material settings
  autoTicks = true;
  disabled = false;
  invert = false;
  max = 10;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 1;
  vertical = false;
  disableSelect = true;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;





}
