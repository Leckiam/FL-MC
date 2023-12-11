import { Component, OnInit, inject } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/class/user/user';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  headerName:any
  seg:number;
  public fireBase = inject(FirebaseService);
  constructor(private method:MethodService,private appComponent:AppComponent) {
    this.appComponent.cantLoadPages += 1;
  }
  
  ngOnInit() {
    this.headerName = document.getElementById('header-login');
  }

  changePage(namePage:string,nameComponent?:string){
    this.method.ingresar(namePage,nameComponent);
  }

  convertirAMinusculas(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase().trim();
  }
  changeHeader(canBack:boolean,nameTitle:string){
    const divTitle = `<ion-title id="titule-name-login">${nameTitle}</ion-title>`;
    const divTitleBack = `
    <ion-buttons slot="start">
      <ion-back-button id="button-login-back" style="display: block;"></ion-back-button>
      <ion-title class="titule-padd" id="titule-name-login">${nameTitle}</ion-title>
    </ion-buttons>`;
    if (canBack) {
      this.headerName.innerHTML=divTitleBack;
      let buttonTmp = document.querySelector('#button-login-back') as HTMLElement;
      if (buttonTmp) {
        let loginPageThis = this;
        buttonTmp.addEventListener('click',function(){
          loginPageThis.retroceder();
        });
      }
    } else {
      this.headerName.innerHTML=divTitle;
    }
  }
  ionViewWillEnter() {
    if (this.appComponent.cantLoadPages>=2) {
      this.method.ingresar('login','')
      window.location.reload();
    }
  }
  retroceder(){
    try{
      this.method.retroceder();
    } catch (error) {
      console.log(error)
    }
  }
}




