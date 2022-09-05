import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { GroupChannelComponent } from './group-channel/group-channel.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{path:'', component: LoginComponent}, {path:'groupChannel', component:GroupChannelComponent}, {path:'chat', component:ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
