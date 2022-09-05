import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import data from '../../../server/users.json';
import { Userobj } from '../userobj';

@Component({
  selector: 'app-group-channel',
  templateUrl: './group-channel.component.html',
  styleUrls: ['./group-channel.component.css']
})
export class GroupChannelComponent implements OnInit {
  userid = sessionStorage.getItem('userid');
  username = sessionStorage.getItem('username');
  birthday = sessionStorage.getItem('userbirthdate');
  age = sessionStorage.getItem('userage');
  //userobj:Userobj[]= data;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
