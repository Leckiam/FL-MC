import { Component, OnInit } from '@angular/core';
import { MethodService } from 'src/app/services/method/method.service';
import { BbddService } from 'src/app/services/sqlite/bbdd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  tituleName:any
  constructor(private method:MethodService,private bbdd:BbddService) {
    this.method.firstTime = true;
    this.validarExiste('hola')
  }
  
  ngOnInit() {
    this.tituleName = document.getElementById('titule-name-login');
  }

  changePage(namePage:string,nameComponent?:string){
    let listaLogin = ['','register','recoverpass']
    let tituleLogin = ['Iniciar Sesión','Registrarse','Recuperar Contraseña']
    if (nameComponent && listaLogin.includes(nameComponent)) {
      const index = listaLogin.indexOf(nameComponent);
      this.tituleName.innerHTML= tituleLogin[index];
    }
    this.method.ingresar(namePage,nameComponent);
  }

  validarExiste(username:string){
    console.log(this.bbdd.listaUsers)
  }

  ionViewWillEnter() {
    if (!this.method.firstTime) {
      this.method.ingresar('login','')
      window.location.reload()
    }
  }
}




