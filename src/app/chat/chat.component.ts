import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { ImguploadService } from '../services/imgupload.service';
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
  rooms = [];
  roomslist: string="";
  roomnotice: string="";
  currentroom: string="";
  isinRoom=false;
  newroom:string="";
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
    this.socketService.getroomList((msg:any)=>{this.rooms = JSON.parse(msg)});
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

  public checkUser(){
    if (this.role == 'super' || this.role == 'gadmin' || this.role == 'gassist'){
      this.isadmin = true;
    }
  };

  joinroom(){
    this.socketService.joinroom(this.roomslist);
    this.socketService.reqnumusers(this.roomslist);
    this.socketService.getnumusers((res:any)=> {this.numusers = res});
  }

  clearnotice(){
    this.roomnotice = "";
  }

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

  createroom(){
    if (this.newroom != ""){
      console.log(this.createroom);
      this.socketService.createroom(this.newroom);
      this.socketService.reqroomList();
      this.newroom = "";
    } else {
      alert("place name for new room");
      this.newroom == "";
    }
  }

/*
  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message:any) => {
        this.messages.push(message);
      });
  }
  */
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

  /*
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
}*/
}
