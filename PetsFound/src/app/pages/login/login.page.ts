import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user={
    username:'',
    password:''
  }

  constructor(private appComponentt:AppComponent) {}

  ngOnInit() {
  }

  changePageLog(namePage:any){
    let navegationExtras: NavigationExtras = {
      state:{
        user: this.user
      }
    }
    console.log(this.user)
    this.appComponentt.ingresar(namePage,navegationExtras);
  }
}
