import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path : 'register',component : RegisterComponent},
  {path : 'chat',component : ChatComponent},
  {path : '',component : LoginComponent},
  {path : '*',component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
