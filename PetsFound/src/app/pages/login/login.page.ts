import { Component, OnInit } from '@angular/core';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  tituleName:any
  constructor(private method:MethodService) {
    localStorage.setItem('firstTime','false');
  }
  
  ngOnInit() {
    this.tituleName = document.getElementById('titule-name-login');
  }

  changePage(namePage:string,nameComponent?:string){
    this.method.ingresar(namePage,nameComponent);
  }


  ionViewWillEnter() {
    if (localStorage.getItem('firstTime')=='true') {
      this.method.ingresar('login','')
      window.location.reload()
    }
  }
}




