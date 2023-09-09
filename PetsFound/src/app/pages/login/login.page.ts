import { Component, OnInit, Renderer2 } from '@angular/core';
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
  constructor(private appComponentt:AppComponent) {}
  
  ngOnInit() {
    let LoginObj = this
    const content = document.getElementById('content-login-pf');
    const btn_irRegister = content?.querySelector('#btn-irRegister') as HTMLElement;
    const btn_irRecover = content?.querySelector('#btn-irRecover') as HTMLElement;
    const btn_login = content?.querySelector('#btn-login') as HTMLElement;
    const spinner = content?.querySelector('#div-spinner') as HTMLElement;
    btn_login?.addEventListener('click',function(){
      spinner.style.display = 'block';
      btn_login.style.pointerEvents = 'none'
      btn_irRegister.style.pointerEvents = 'none'
      setTimeout(function () {
        let seg = 0;
        if (seg=1) {
          LoginObj.changePageLog('home');
          spinner.style.display = 'none';
          btn_login.style.pointerEvents = 'auto'
          btn_irRegister.style.pointerEvents = 'auto'
        }
        seg+=1;
      }, 1000); 
    });
    btn_irRegister?.addEventListener('click',function(){
      LoginObj.changePage('register');
    });
    btn_irRecover?.addEventListener('click',function(){
      LoginObj.changePage('recoverpass');
    });
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
    
    this.appComponentt.firstTime = false
    this.appComponentt.ingresar(namePage,navegationExtras);
  }} 
  
  ionViewWillEnter() {
    if (this.appComponentt.firstTime == false) {
      location.reload()
    }
  }
  
}




