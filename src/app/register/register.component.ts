import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userdetails = {
    email : '',
    password : '',
    username : ''
  }

  constructor(public http: HttpClient,
              private router: Router,
              public cookieService : CookieService) { }

  ngOnInit(): void {
  }

  public registerUser(){
    this.http.post('http://localhost:3000/register/', this.userdetails)
    .subscribe(
      (res) => {
        this.cookieService.delete('token');
        this.router.navigate(['/login']);
      }
    );
  }

}
