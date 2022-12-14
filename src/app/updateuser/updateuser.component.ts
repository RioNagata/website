import { Component, OnInit } from '@angular/core';
import {Users} from '../Users'
import { trigger,state, style, animate, transition} from '@angular/animations';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  updatename:string = "";
  updateid:string = "";
  updateemail:string = "";
  updaterole:string = "";
  updatepassword:string="";
  updateuser: Users | undefined;
  updatevalue: any;
  noticeshow:boolean=false;
  newProductMessage="";
  constructor(private activatedroute: ActivatedRoute, private userdata:UsersService, private router: Router){}
  ngOnInit(): void {
    this.updatevalue = this.activatedroute.params.subscribe((params) => {
      this.updateid = params['iteminfo']
    })
  }
    
  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  
  // function for editing user info
  editUser(event: { preventDefault: () => void; }){
    event.preventDefault();
    console.log(this.updaterole);
    //if information is missing, send error
    if(this.updatename == "" || this.updateemail == "" || this.updatepassword == "" || this.updaterole == ""){
      alert('missing information');
    } else{
      // if the role is either, user, gassist, gadmin, or super, set updated value into an array
      if(this.updaterole == 'user' || this.updaterole == 'gassist' || this.updaterole == 'gadmin' || this.updaterole == 'super' ){
        this.updateuser = {
          userid: this.updateid,
          username: this.updatename,
          email: this.updateemail,
          password: this.updatepassword,
          userrole: this.updaterole
      }
        console.log(this.updateuser);
        // sends the array to the server-side, and reset all data
        this.userdata.updateuser(this.updateuser!).subscribe((data: any)=>{
          this.updateid = "";
          this.updatename = "";
          this.updateemail = "";
          this.updaterole = "";
          this.updatepassword = "";
          this.router.navigateByUrl('user');
        });
      }else {
        alert('user role needs to be super, gassist, gadmin or user');
      }
    }
  }
}

