import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  

  tituleName:any
  constructor(private appComponentt:AppComponent) {
    this.appComponentt.firstTime = true;
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
    this.appComponentt.ingresar(namePage,nameComponent);
  }
  ionViewWillEnter() {
    if (!this.appComponentt.firstTime) {
      this.appComponentt.ingresar('login','')
      window.location.reload()
    }
  }
}




