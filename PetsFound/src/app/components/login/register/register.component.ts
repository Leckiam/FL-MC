import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private method:MethodService, private loginpage:LoginPage) {}

  userTmp:User = new User();
  passwordTmp:string='';

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
    if (this.registrar()) {
      let msg = 'Se ha registrado exitosamente';
      this.method.presentToast('bottom',msg);
      this.changePage('login','');
    } else {
      let msgErr = 'Su registro ha fallado'
      this.method.presentToast('bottom',msgErr)
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
    this.userTmp.username='';
    for (let i = 0; i < correo.length; i++) {
      const letra = correo[i];
      if (letra == '@') {
        break;
      } else {
        this.userTmp.username+=letra;
      }
    }
    if (this.validarDatoUserTmp()) {
      let data = [this.userTmp.nombre,this.userTmp.correo,this.userTmp.username,this.userTmp.password,0];
      this.loginpage.bbdd.addValuesInTable(data,['nombre','correo','username','password','isStaff'],'user');
      return true;
    } else {
      return false;
    }
  }
  validarDatoUserTmp(){
    if (this.userTmp.password == this.passwordTmp && 
      this.userTmp.password.length >= 6 && this.userTmp.username.length >= 6
      && this.userTmp.correo.length >= 8){
      for (let i = 0; i < this.userTmp.correo.length; i++) {
        const element = this.userTmp.correo[i];
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
    this.userTmp = new User();
  }
}
