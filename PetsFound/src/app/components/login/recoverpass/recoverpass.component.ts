import { Component, OnInit } from '@angular/core';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MethodService } from 'src/app/services/method/method.service';
import { BbddService } from 'src/app/services/sqlite/bbdd.service';

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
    let RecoverObj = this;
    const content = document.getElementById('content-recoverpass-pf');
    const btn_irLogin = content?.querySelector('.btn-irLogin') as HTMLElement;
    btn_irLogin?.addEventListener('click',function(){
      RecoverObj.changePage('login','');
    });
  }

  changePage(namePage:string,nameComponent?:string){
    this.loginpage.changePage(namePage,nameComponent);
  }
  retroceder() {
    this.method.retroceder();
  }
  convertirAMinusculas(event: any) {
    this.loginpage.convertirAMinusculas(event);
  }
  ionViewWillEnter() {
    this.loginpage.tituleName.innerHTML = "Recuperar contraseña";
    this.userSearch.email = "";
    this.userSearch.password = "";
  }
}
