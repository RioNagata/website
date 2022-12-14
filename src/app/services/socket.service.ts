import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from "socket.io-client";
const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  constructor() { }
  // methods for sockets
  initSocket(): void{
    this.socket = io(SERVER_URL);
    //return ()=>{this.socket.disconnect();}
  }

 joinroom(selroom:any): void{
  this.socket.emit("joinroom", selroom);
 }

 leaveroom(selroom: any): void{
  this.socket.emit("leaveRoom", selroom);
 }

 joined(next: any){
  this.socket.on('joined', (res:any)=>next(res));
 }

 createroom(newroom: any){
  this.socket.emit('newroom', newroom);
 }

 reqnumusers(selroom: any){
  this.socket.emit("numusers", selroom);
 }

 getnumusers(selroom: any){
  this.socket.emit("numusers", selroom);
 }

 reqroomList(){
  this.socket.emit('roomlist', 'list please');
 }

 getroomList(next:any){
  this.socket.on('roomlist', (res: any)=>next(res));
 }

 notice(next: any){
  this.socket.on('notice', (res:any)=>next(res));
 }

 sendMessage(message: string, username: string):void{
  this.socket.emit('message', message, username);
 }

 getMessage(next: any){
  this.socket.on('message', (message:any) => next(message));
 }

 sendImage(image: string, username: string):void{
  this.socket.emit('image', image, username);
 }

 getImage(next: any){
  this.socket.on('image', (image:any) => next(image));
 }
}
