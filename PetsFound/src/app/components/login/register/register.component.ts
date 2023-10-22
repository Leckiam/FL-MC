import { Component, OnInit } from '@angular/core';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private method:MethodService, private loginpage:LoginPage) {}

  userTmp ={
    usuario:'',
    email:'',
    password:'',
    twoPassword:''
  }

  ngOnInit() {
    let RegisterObj = this;
    const content = document.getElementById('content-register-pf');
    const btn_irLogin = content?.querySelector('.btn-irLogin') as HTMLElement;
    const btn_register = content?.querySelector('#btn-register') as HTMLElement;
    const spinner = content?.querySelector('#div-spinner') as HTMLElement;
    btn_register?.addEventListener('click',function(){
      spinner.style.display = 'flex';
      btn_register.style.pointerEvents = 'none'
      btn_irLogin.style.pointerEvents = 'none'
      setTimeout(function () {
        let seg = 0;
        if (seg=1) {
          RegisterObj.changePageReg();
          spinner.style.display = 'none';
          btn_register.style.pointerEvents = 'auto'
          btn_irLogin.style.pointerEvents = 'auto'
        }
        seg+=1;
      }, 1000); 
    });
    btn_irLogin?.addEventListener('click',function(){
      RegisterObj.changePage('login');
    });
  }

  changePageReg(){
    if (this.validarDatoUserTmp()) {
      let msg = 'Se ha registrado exitosamente'
      this.method.presentToast('bottom',msg)
      this.changePage('login','');
    } else {
      let msgErr = 'Su registro ha fallado'
      this.method.presentToast('bottom',msgErr)
    }
  }

  changePage(namePage:string,nameComponent?:string){
    this.loginpage.changePage(namePage,nameComponent);
  }

  validarDatoUserTmp(){
    if (this.userTmp.password == this.userTmp.twoPassword && 
      this.userTmp.password.length >= 6 && this.userTmp.usuario.length >= 6
      && this.userTmp.email.length >= 8){
      for (let i = 0; i < this.userTmp.email.length; i++) {
        const element = this.userTmp.email[i];
        if (element=='@') {
          return true
        }
      }
      return false
    }else {
      return false
    }
  }
  retroceder() {
    this.method.retroceder();
  }
  ionViewWillEnter() {
    this.loginpage.tituleName.innerHTML = "Registrarse";
    this.userTmp.email = "";
    this.userTmp.usuario = "";
    this.userTmp.password = "";
    this.userTmp.twoPassword = "";
  }
}
