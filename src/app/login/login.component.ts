import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../Login';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  pwd: string = "";
  loginform: Login | undefined;
  newProductMessage="";
  noticeshow:boolean=false;

  constructor(private router: Router, private userdata: UsersService) { }

  ngOnInit(): void {
  }
  
  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  Login(event: { preventDefault: () => void; }){
    event.preventDefault();
    if(this.username == "" || this.pwd == ""){
      alert("Insert both username and password")
    } else {
      this.loginform = {
        Username: this.username,
        Password: this.pwd
    }
       //new Products("", this.productid,this.productname, this.productdesc, this.productprice, this.productprice, this.productunits);
      this.userdata.login(this.loginform!).subscribe((data: any)=>{
        if(data.err == null){
          sessionStorage.setItem("username", data[0]['username']);
          sessionStorage.setItem("userrole", data[0]['userrole']);
          this.router.navigateByUrl('chat');
        } else {
          alert("user or password is not valid")
        }
      });
    }
  }
}
