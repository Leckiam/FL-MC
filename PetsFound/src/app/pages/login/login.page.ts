import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoggingIn = false;
  
  user={
    usuario:"",
    password:""
  }
  constructor(private appComponentt:AppComponent) { }
  
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




