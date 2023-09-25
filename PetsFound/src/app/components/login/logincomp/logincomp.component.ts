import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginPage } from 'src/app/pages/login/login.page';

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
  constructor(private appComponentt:AppComponent, private loginpage:LoginPage) {}
  
  ngOnInit() {
    let LoginObj = this;
    const content = document.getElementById('content-login-pf');
    const btn_irRegister = content?.querySelector('#btn-irRegister') as HTMLElement;
    const btn_irRecover = content?.querySelector('#btn-irRecover') as HTMLElement;
    const btn_login = content?.querySelector('#btn-login') as HTMLElement;
    const spinner = content?.querySelector('#div-spinner') as HTMLElement;
    btn_login?.addEventListener('click',function(){
      LoginObj.estadoSpinner(true,spinner,btn_login,btn_irRegister,btn_irRecover);
      setTimeout(function () {
        let seg = 0;
        if (seg=1) {
          LoginObj.changePageLog('home','');
          LoginObj.estadoSpinner(false,spinner,btn_login,btn_irRegister,btn_irRecover);
        }
        seg+=1;
      }, 1000); 
    });
    btn_irRegister?.addEventListener('click',function(){
      LoginObj.loginpage.changePage('login','register');
    });
    btn_irRecover?.addEventListener('click',function(){
      LoginObj.loginpage.changePage('login','recoverpass');
    });
  }

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
    this.appComponentt.presentToast('bottom',msg)
    
  } else {
    let navegationExtras: NavigationExtras = {
      state:{
        user: this.user
      }
    }
    if (nameComponent) {
      namePage = namePage + '/' + nameComponent;
    }
    this.appComponentt.isLogin = true;
    this.appComponentt.ingresar(namePage,'',navegationExtras);
  }} 
  
  ionViewWillEnter() {
    if (!this.appComponentt.firstTime) {
      window.location.reload()
    }
  }
  
}
