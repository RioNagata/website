import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { ImguploadService } from '../services/imgupload.service';
import { Room } from '../Rooms';
const SERVER_URL = 'http://localhost:3000'
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  imagecontent:any = null;
  private socket: any;
  messagecontent:any= "";
  images:string[] = [];
  messages:string[] = [];
  ioConnection: any;
  rooms: Room[] = [];
  roomslist: string="";
  roomnotice: string="";
  currentroom: string="";
  isinRoom=false;
  newroom:string="";
  createnewroom: Room | undefined;
  numusers:number=0;
  isadmin = false;
  role = sessionStorage.getItem('userrole');
  username = sessionStorage.getItem('username');

  constructor(private socketService: SocketService, private router: Router, private imguploadService:ImguploadService) { }

  ngOnInit(): void {
    //this.initIoConnection();
    this.socketService.initSocket();
    this.socketService.getMessage((m:any)=>{this.messages.push(m)});
    this.socketService.getImage((i:any)=>{this.images.push(i)});
    this.socketService.reqroomList();
    this.socketService.getroomList((msg:any)=>{
      msg.forEach((element: Room[]) => {
        this.rooms = element;
      });
    });
    this.socketService.notice((notice:any)=>{this.roomnotice = notice});
    this.socketService.joined((msg:any)=>{this.currentroom = msg
      if(this.currentroom != ""){
        this.isinRoom = true;
      } else { 
        this.isinRoom = false;
      }
    });
    this.checkUser();
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  // checks if the user is either super, gadmin or gassist
  public checkUser(){
    if (this.role == 'super' || this.role == 'gadmin' || this.role == 'gassist'){
      this.isadmin = true;
    }
  };
  // function for joining the room
  joinroom(){
    this.socketService.joinroom(this.roomslist);
    this.socketService.reqnumusers(this.roomslist);
    this.socketService.getnumusers((res:any)=> {this.numusers = res});
  }

  clearnotice(){
    this.roomnotice = "";
  }
  // function for leaving the room
  leaveroom(){
    this.socketService.leaveroom(this.currentroom);
    this.socketService.reqnumusers(this.currentroom);
    this.socketService.getnumusers((res:number) => {this.numusers = res});
    this.roomslist = "";
    this.currentroom = "";
    this.isinRoom = false;
    this.numusers = 0;
    this.roomnotice = "";
    this.messages = [];
  }
  // function for creating room
  createroom(){
    if (this.newroom != ""){
      this.createnewroom = {
        roomname: this.newroom,
    }
    console.log(this.createnewroom);
      this.socketService.createroom(this.createnewroom);
      this.socketService.reqroomList();
      this.newroom = ""
    } else {
      alert("place name for new room");
      this.newroom == "";
    }
  }
  // function for sending image/message chat
  chat(){
    if(this.messagecontent, this.username){
      this.socketService.sendMessage(this.messagecontent, this.username);
      this.messagecontent = null;
    } else if(this.messagecontent, this.username){
      console.log(this.imagecontent);
      this.socketService.sendImage(this.imagecontent, this.username);
      this.imagecontent = null;
    } else {
      console.log("no image");
    }
  }

  ImageSelected(files: any){
    if (files.length == 0){
      alert("image selected: " + files[0].name);
    }
  }

  
  title = 'imageupload';
  selectedfile:any = null;
  imagepath="";

  onFileSelected(event:any){
    this.selectedfile = event.target.files[0];
    console.log(this.selectedfile);
  }
  onUpload(){
    const fd = new FormData();
    fd.append('image',this.selectedfile,this.selectedfile.name);
    this.imguploadService.imgupload(fd).subscribe(res=>{  
    this.imagepath = res.data.filename;
  });
}
}
