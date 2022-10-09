import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GroupChannelComponent } from './group-channel/group-channel.component';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { ChatComponent } from './chat/chat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserlistComponent } from './userlist/userlist.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupChannelComponent,
    ChatComponent,
    UserlistComponent,
    UpdateuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
    CommonModule, NgbModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
