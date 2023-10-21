import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-logincomp',
  templateUrl: './logincomp.component.html',
  styleUrls: ['./logincomp.component.scss'],
})
export class LogincompComponent  implements OnInit {

  user={
    usuario:"",
    password:""
  }
  tituleName:any
  constructor(private method:MethodService, private loginpage:LoginPage) {}
  
  ngOnInit() {}

  estadoBtns(estado:boolean,btn_login:any,btn_irRegister:any,btn_irRecover:any){
    if (estado) {
      btn_login.style.pointerEvents = 'auto';
      btn_irRegister.style.pointerEvents = 'auto';
      btn_irRecover.style.pointerEvents = 'auto';
    } else {
      btn_login.style.pointerEvents = 'none';
      btn_irRegister.style.pointerEvents = 'none';
      btn_irRecover.style.pointerEvents = 'none';
    }
  }

  estadoSpinner(estado:boolean,spinner:any,btn_login:any,btn_irRegister:any,btn_irRecover:any){
    if (estado) {
      spinner.style.display = 'block';
      this.estadoBtns(false,btn_login,btn_irRegister,btn_irRecover)
    } else {
      spinner.style.display = 'none';
      this.estadoBtns(true,btn_login,btn_irRegister,btn_irRecover)
    }
  }

  validarLogin(user:any){
    if (user.usuario.length >=6 && user.password.length >=6) {
      return true
    } else {
      return false
    } 
  } 

  changePageLog(namePage:string,nameComponent?:string){
  if (!this.validarLogin(this.user)){
    let msg= 'Su usuario y/o contraseña no está dentro del rango de caracteres (6 caracteres)'
    this.method.presentToast('bottom',msg)
    
  } else {
    if (nameComponent) {
      namePage = namePage + '/' + nameComponent;
    }
    this.aprobarIngreso(namePage);
  }} 
  
  ionViewWillEnter() {
    if (!this.method.firstTime) {
      window.location.reload()
    }
  }
  aprobarIngreso(namePage:string){
    let navegationExtras: NavigationExtras = {
      state:{
        user: this.user
      }
    }
    this.method.ingresar(namePage,'',navegationExtras);
  }
  
}
