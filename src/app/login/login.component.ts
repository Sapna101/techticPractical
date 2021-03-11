import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logindetails = {
    email : '',
    password : ''
  };
  errormsg = false;
  errorname = "Invalid email or password";

  constructor(private http : HttpClient,
              private router : Router,
              private cookieService : CookieService) { }

  ngOnInit(): void {
    this.cookieService.delete('token');
  }

  public loginUser(){
    this.http.get('http://localhost:3000/login/',{ params: this.logindetails })
    .subscribe(
      (res) => {
          if(res['token'] != null){
            this.cookieService.set('token' , res['token']);
            this.router.navigate(['/chat']);
          }else{
            this.errormsg = true;
          }
      }
    );
  }

}
