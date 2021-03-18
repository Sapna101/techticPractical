import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path : 'register',component : RegisterComponent},
  {path : 'chat',component : ChatComponent},
  {path : 'addproduct',component : AddProductComponent},
  {path : 'productlist',component : ProductListComponent},
  {path : '',component : LoginComponent},
  {path : '*',component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
