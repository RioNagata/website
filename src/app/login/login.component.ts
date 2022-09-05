import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import data from '../../../server/users.json';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

import { NgForm } from '@angular/forms';
import { Userpwd } from '../userpwd';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userpwd: Userpwd = {username: '', pwd: ''}
  
  ngOnInit(): void{
}
  constructor(private router: Router, private httpClient: HttpClient) { }

  public checkuser(){
    this.httpClient.post(BACKEND_URL + '/login', this.userpwd, httpOptions)
      .subscribe((data:any) => {
        alert(JSON.stringify(this.userpwd));
        if (data.ok){
          this.httpClient.post<Userpwd[]>(BACKEND_URL + '/login', this.userpwd, httpOptions)
          .subscribe((m: any) => {console.log(m[0]);});
          sessionStorage.setItem("username", data.data['username']);
          sessionStorage.setItem("userrole", data.data['userrole']);
          this.router.navigateByUrl('chat');
        } else {
          alert("user or password is not valid")
        }
    })
  }
}
