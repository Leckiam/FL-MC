import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private appComponentt:AppComponent) { }

  userTmp ={
    usuario:'',
    email:'',
    password:'',
    twoPassword:''
  }

  ngOnInit() {
    let RegisterObj = this
    const content = document.getElementById('content-regist-pf');
    const btn_irLogin = content?.querySelector('#btn-irLogin') as HTMLElement;
    const btn_register = content?.querySelector('#btn-register') as HTMLElement;
    const spinner = content?.querySelector('#div-spinner') as HTMLElement;
    btn_register?.addEventListener('click',function(){
      spinner.style.display = 'flex';
      btn_register.style.pointerEvents = 'none'
      btn_irLogin.style.pointerEvents = 'none'
      setTimeout(function () {
        let seg = 0;
        if (seg=1) {
          RegisterObj.changePageReg('login');
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

  changePageReg(namePage:any){
    if (this.validarDatoUserTmp()) {
      let msg = 'Se ha registrado exitosamente'
      this.appComponentt.presentToast('bottom',msg)
      this.appComponentt.ingresar(namePage);
    } else {
      let msgErr = 'Su registro ha fallado'
      this.appComponentt.presentToast('bottom',msgErr)
    }
  }
  changePage(namePage:any){
    this.appComponentt.ingresar(namePage);
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
    this.appComponentt.retroceder();
  }
}
