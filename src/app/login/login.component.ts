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
  // function for logging in 
  Login(event: { preventDefault: () => void; }){
    event.preventDefault();
    // if username or/and password is missing, send error
    if(this.username == "" || this.pwd == ""){
      alert("ユーザー名とパスワードを記入してください")
    } else {
      this.loginform = {
        // set loginform array's data as the new login data
        Username: this.username,
        Password: this.pwd
    }
      // sends the server-side for logging ig
      this.userdata.login(this.loginform!).subscribe((data: any)=>{
        if(data.err == null){
          //if login valid, set the username and role as a session storage
          sessionStorage.setItem("username", data[0]['username']);
          sessionStorage.setItem("userrole", data[0]['userrole']);
          this.router.navigateByUrl('chat');
        } else {
          alert("ユーザー名かパスワードが間違っています")
        }
      });
    }
  }
}
