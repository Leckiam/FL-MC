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
  }
  changePage(namePage:any){
    if (this.validarDatoUserTmp()) {
      let msg = 'Se ha registrado exitosamente'
      this.appComponentt.presentToast('bottom',msg)
      this.appComponentt.ingresar(namePage);
    } else {
      let msgErr = 'Su registro ha fallado'
      this.appComponentt.presentToast('bottom',msgErr)
    }
  }
  changePageLog(namePage:any){
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
}
