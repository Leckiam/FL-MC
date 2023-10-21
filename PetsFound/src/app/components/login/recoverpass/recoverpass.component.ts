import { Component, OnInit } from '@angular/core';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.scss'],
})
export class RecoverpassComponent  implements OnInit {

  userSearch:any = {
    email:'',
    password:''
  }

  constructor(private method:MethodService, private loginpage:LoginPage) {}

  ngOnInit() {
    let RecoverObj = this
    let tituleName = document.getElementById('titule-name');
    if (tituleName) {
      tituleName.innerHTML='Recuperar contraseña';
    }
    const content = document.getElementById('content-recoverpass-pf');
    const btn_irLogin = content?.querySelector('.btn-irLogin') as HTMLElement;
    btn_irLogin?.addEventListener('click',function(){
      RecoverObj.loginpage.tituleName.innerHTML = 'Iniciar Sesion'
      RecoverObj.loginpage.changePage('login','');
    });
  }

  retroceder() {
    this.method.retroceder();
  }
}
