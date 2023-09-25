import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoginPage } from 'src/app/pages/login/login.page';

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

  constructor(private appComponent:AppComponent, private loginpage:LoginPage) {}

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
    this.appComponent.retroceder();
  }
}
