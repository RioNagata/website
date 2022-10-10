import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login } from '../Login';
import { Users } from '../Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  add(user: Users){
    return this.http.post<any>('http://localhost:3000/api/add', user);
  }

  getuser(){
    return this.http.get<any>('http://localhost:3000/api/getuser');
  }

  updateuser(user: Users){
    return this.http.post<any>('http://localhost:3000/api/update', user);
  }

  deleteuser(productID: any){
    return this.http.post<any>('http://localhost:3000/api/remove', {'productid': productID});
  }

  login(login: Login){
    return this.http.post<any>('http://localhost:3000/api/login', login);
  }
  
  /*checkvalidid(productID: any){
    return this.http.post<any>('http://localhost:3000/api/checkvalidid', {'id': productID});
  }*/

  getproductcount(){
    return this.http.get<any>('http://localhost:3000/api/prodcount');
  }
}

