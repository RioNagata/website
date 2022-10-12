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

  editProduct(event: { preventDefault: () => void; }){
    event.preventDefault();
    if(this.updateid == null){
      console.log('error');
    } else {
      this.updateuser = {
        userid: this.updateid,
        username: this.updatename,
        email: this.updateemail,
        password: this.updatepassword,
        userrole: this.updaterole
    }
    console.log(this.updateuser);
      this.userdata.updateuser(this.updateuser!).subscribe((data: any)=>{
        this.updateid = "";
        this.updatename = "";
        this.updateemail = "";
        this.updaterole = "";
        this.updatepassword = "";
        this.router.navigateByUrl('user');
      });
    }
  }
}

