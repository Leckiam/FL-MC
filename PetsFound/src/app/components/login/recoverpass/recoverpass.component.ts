import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { LoginPage } from 'src/app/pages/login/login.page';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.scss'],
})
export class RecoverpassComponent  implements OnInit {

  userSearch:User = new User();

  constructor(private method:MethodService, private loginpage:LoginPage, private fireBase:FirebaseService) {}

  ngOnInit() {}

  changePage(namePage:string,nameComponent?:string){
    this.loginpage.changePage(namePage,nameComponent);
  }
  retroceder() {
    this.method.retroceder();
  }
  convertirAMinusculas(event: any) {
    this.loginpage.convertirAMinusculas(event);
  }

  recoverPass(){
    this.fireBase.recoverPass(this.userSearch.correo);
    this.changePage('login','');
  }

  ionViewWillEnter() {
    this.loginpage.tituleName.innerHTML = "Recuperar contraseña";
    this.userSearch.correo = "";
  }
}
