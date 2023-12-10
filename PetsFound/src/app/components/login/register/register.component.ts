import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MethodService } from 'src/app/services/method/method.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  userTmp:User = new User();
  passwordTmp:string='';
  constructor(private method:MethodService, private loginpage:LoginPage, private fireBase:FirebaseService) {
    this.userTmp.nombre = "";
    this.userTmp.correo = "";
    this.userTmp.password = "";
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
          spinner.style.display = 'none';
          btn_register.style.pointerEvents = 'auto';
          btn_irLogin.style.pointerEvents = 'auto';
          RegisterObj.changePageReg();
        }
        seg+=1;
      }, 1000); 
    });
    btn_irLogin?.addEventListener('click',function(){
      RegisterObj.changePage('login');
    });
  }

  changePageReg(){
    if (this.registrar()) {
      let msg = 'Se ha registrado exitosamente';
      this.method.presentToast('bottom',msg);
      this.changePage('login','');
    }
  }

  changePage(namePage:string,nameComponent?:string){
    this.loginpage.changePage(namePage,nameComponent);
  }
  convertirAMinusculas(event: any) {
    this.loginpage.convertirAMinusculas(event);
  }
  
  registrar(){
    const correo = this.userTmp.correo;
    this.userTmp.username=this.method.getUsername(correo);
    if (this.validarDatoUserTmp()) {
      this.fireBase.addUser(this.userTmp.correo,this.userTmp.password,this.userTmp.nombre,false);
      return true;
    } else {
      return false;
    }
  }

  validarDatoUserTmp(){
    if (this.userTmp.password == this.passwordTmp && 
      this.userTmp.password.length >= 6 && this.userTmp.nombre.length >= 4
      && this.validarCorreo(this.userTmp.correo)){
      return true;
    }else {
      this.method.presentToast('top',this.msgError());
      return false
    }
  }
  validarCorreo(correo:string):boolean {
    if (correo.length >= 8) {
      if (correo.indexOf('@') != -1 || correo.indexOf('@') != 0) {
        if (correo.substring(-4) == '.com' || correo.substring(-3) == '.cl') {
          return true;
        }
      }
    }
    return false;
  }
  msgError(){
    let msgErr = 'ERROR:';
    if (this.userTmp.password != this.passwordTmp) {
      msgErr += '-Contraseñas no coinciden \n';
    } if (this.userTmp.password.length && this.userTmp.password.length < 6) {
      msgErr += '-La contraseña es inferior a los 6 digitos \n';
    } if (this.userTmp.nombre.length && this.userTmp.nombre.length < 4) {
      msgErr += '-El nombre es inferior a los 4 digitos \n';
    } if (!this.validarCorreo(this.userTmp.correo)) {
      msgErr += '-El correo es inválido (sin formato y/o inferior a 8 digitos)';
    }
    if (msgErr = 'ERROR') {
      this.method.presentToast('bottom','Registro no valido');
    }
    return msgErr;
  }
  retroceder() {
    this.method.retroceder();
  }
  ionViewWillEnter() {
    this.loginpage.tituleName.innerHTML = "Registrarse";
    this.userTmp = new User();
  }
}
