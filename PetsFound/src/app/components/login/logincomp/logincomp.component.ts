import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { LoginPage } from 'src/app/pages/login/login.page';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-logincomp',
  templateUrl: './logincomp.component.html',
  styleUrls: ['./logincomp.component.scss'],
})
export class LogincompComponent  implements OnInit {

  user:User = new User();
  constructor(private method:MethodService, private loginpage:LoginPage, private fireBase:FirebaseService) {
    console.log('Esto es constructor [/Login]');
    this.user.correo = '';
    this.user.password = '';
  }
  
  ngOnInit() {
    console.log('Esto es ngOnInit [/Login]');
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
          LoginObj.estadoSpinner(false,spinner,btn_login,btn_irRegister,btn_irRecover);
        }
        seg+=1;
      }, 1000); 
    });
    btn_irRegister?.addEventListener('click',function(){
      LoginObj.loginpage.fireBase.existeUsersInBD();
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
  convertirAMinusculas(event: any) {
    this.loginpage.convertirAMinusculas(event);
  }
  estadoSpinner(estado:boolean,spinner:any,btn_login:any,btn_irRegister:any,btn_irRecover:any){
    if (estado) {
      spinner.style.display = 'block';
      this.estadoBtns(false,btn_login,btn_irRegister,btn_irRecover)
    } else {
      spinner.style.display = 'none';
      this.estadoBtns(true,btn_login,btn_irRegister,btn_irRecover)
      this.changePageLog('home','');
    }
  }

  validarLogin(user:any){
    if (user.correo.length >=6 && user.password.length >=6) {
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
      if (this.loginUser()) {
        this.aprobarIngreso(namePage);
      } else {
        this.method.presentToast('bottom','No sea encontrado a ningun usuario que cumpla con los parametros ingresados')
      } 
    }
  }
  ionViewWillEnter() {
    console.log('Esto es ionViewWillEnter [/Login]');
    this.loginpage.seg  = 0;
    this.loginpage.tituleName.innerHTML = "Iniciar Sesión";
  }

  aprobarIngreso(namePage:string){
    /*
    let navegationExtras: NavigationExtras = {
      state:{
        user: this.user
      }
    }
    */
    this.user.correo = "";
    this.user.password = "";
    //this.method.ingresar(namePage,'',navegationExtras);
    this.method.ingresar(namePage,'');
  }

  loginUser(){
    this.fireBase.loginUser(this.user.correo,this.user.password);
    if (localStorage.getItem('user')) {
      return true;
    } else {
      this.fireBase.logOut();
      return false;
    }
  }
    
}
