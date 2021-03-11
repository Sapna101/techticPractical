import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'techticPractical';

  constructor(private router : Router,
              public cookieService : CookieService) { }

  public logoutUser(){
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  
}
