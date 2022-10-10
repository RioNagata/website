import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  { path: "user", component: UserlistComponent }, 
  { path: "add", component: AdduserComponent }, 
  { path: "update/:iteminfo", component: UpdateuserComponent }, 
  {path: "", component: LoginComponent}, 
  {path: "chat", component: ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
