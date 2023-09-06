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
  constructor(private appComponentt:AppComponent) {
    if (!this.appComponentt.returnFirstTime()) {
      window.location.reload();
    }
  }
  
  ngOnInit() {
  }

  validarLogin(user:any){
    if (user.usuario.length >=6 && user.password.length >=6) {
      return true
    } else {
      return false
    } 
  } 
  changePage(namePage:any){
    this.appComponentt.ingresar(namePage);
  }
  changePageLog(namePage:any){
  if (!this.validarLogin(this.user)){
    let msg= 'Su usuario y/o contraseña no está dentro del rango de caracteres (6 caracteres)'
    this.appComponentt.presentToast('bottom',msg)
    
  } else {
    let navegationExtras: NavigationExtras = {
      state:{
        user: this.user
      }
    }
    
    this.appComponentt.ingresar(namePage,navegationExtras);
  }} 
    
  ionViewWillEnter() {
    if (!this.appComponentt.returnFirstTime()) {
      window.location.reload();
    }
  }
}




