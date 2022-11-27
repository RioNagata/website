import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {Users} from '../Users'
import { trigger,state, style, animate, transition} from '@angular/animations';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  username:string = "";
  userid:string = "";
  email:string = "";
  userrole:string = "";
  password:string="";
  newuser: Users | undefined;
  newProductMessage="";
  iderrormsg:string="This is already exists & New ID is required";
  iderrormsg2:string="";
  iderrorshow:boolean=false;
  noticeshow:boolean=false;

  constructor(private userdata: UsersService, private router: Router) { }
  ngOnInit(): void {
  }

  get stateName(){
    return this.iderrormsg ? 'show':'hide';
  }
  get noticeName(){
    return this.noticeshow ? 'show':'hide';
  }

    
  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  // function for adding users
  addnewUser(event: { preventDefault: () => void; }){
    event.preventDefault();
    if(this.userid == null){
      this.iderrorshow = !this.iderrorshow
    } else {
      if(this.username == "" || this.userid == "" || this.password == "" || this.userrole == "" || this.email == ""){
        alert('missing information');
      } else {
        if(this.userrole == 'user' || this.userrole == 'gassist' || this.userrole == 'gadmin' || this.userrole == 'super' ){
          this.newuser = {
            // sets newuser array value using the data from user
            username: this.username,
            email: this.email,
            userid: this.userid,
            password: this.password,
            userrole: this.userrole
        }
        // sends the data to the server-side, resets all data
          this.userdata.add(this.newuser!).subscribe((data: any)=>{
            this.noticeshow;
            if(data.err == null){
              this.newProductMessage = data.num + " new user (" + this.username + ") was added";
            } else {
              this.newProductMessage = data.err;
            }
            this.userid = "";
            this.username = "";
            this.email = "";
            this.userrole = "";
            this.password = "";
            this.router.navigateByUrl('user');
          });
        } else {
          alert('user role needs to be super, gassist, gadmin or user');
        }
      }
    }
  }
}

