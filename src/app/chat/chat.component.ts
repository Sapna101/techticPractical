import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatlist : any = [];
  difflist : any = [0,0];
  viewchat=false;
  chatdata;

  constructor(private http : HttpClient,
              private router : Router,
              private cookieService : CookieService) { }

  ngOnInit() {
    if(!this.cookieService.get('token')){
      this.router.navigate(['/login']);
    }
    this.getchatdata();
    this.chatdatalist();
  }

  chatdatalist(){
    setInterval(() => {
      this.getchatdata();
    }, 10000);
  }

  openchatscreen(chat,index){
    this.viewchat= true;
    this.chatdata = chat;
    this.difflist[index]=0;
  }

  getchatdata(){
    let resdata : any = [];
    this.http.get('http://localhost:3000/chat/')
    .subscribe(
      (res) => {
        // console.log(res);
        resdata = res;
        if(this.chatlist.length > 0){
          for(let i=0;i<resdata.length;i++){
            if((resdata[i].messages.length) != this.chatlist[i].messages.length){
              this.difflist[i] += ((resdata[i].messages.length)-(this.chatlist[i].messages.length));
            }else{
              this.difflist[i] += 0;
            }
          }
        }
        this.chatlist = resdata;
      },(err) => {
        console.log(err);
      }
    );
  }

}
