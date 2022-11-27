import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {Users} from '../Users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users:Users[] = [];
  constructor(private userdata:UsersService, private router:Router ){}
  username:string = "";
  email:string = "";
  userrole:string = "";
  productid:string="";

  ngOnInit(): void {
    this.userdata.getuser().subscribe((data)=>{
      console.log(data);
      this.users = data;
    });
  }
  // function for deleting user
  deleteproduct(id: any){
    if(confirm("Are you sure you want to delete this item?")){
      this.userdata.deleteuser(id).subscribe((data)=>{
      this.users = data;
      console.log(data);
      });
      this.router.navigateByUrl('products');
    }
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
