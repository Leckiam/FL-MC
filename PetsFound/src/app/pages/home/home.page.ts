import { Component} from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { AppComponent } from 'src/app/app.component';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
import { User } from 'src/app/class/user/user';
import { MethodService } from 'src/app/services/method/method.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  code: any;
  headerName:any;
  tituleName:any;
  headerBack:any;

  user:User;
  dueno:Dueno;
  mascotas:Mascota[];

  constructor(private method:MethodService, private barcodeScanner: BarcodeScanner,
    private appComponent:AppComponent,private emailComposer:EmailComposer) {
    this.appComponent.cantLoadPages += 1;
    const storedUser  = localStorage.getItem('user');
    const storedDueno  = localStorage.getItem('dueno');
    const storedMascotas  = localStorage.getItem('mascotas');
    console.log(localStorage.getItem('user'));
    console.log(localStorage.getItem('dueno'));
    console.log(localStorage.getItem('mascotas'));
    if (storedUser){
      this.user = JSON.parse(storedUser);
    } if(storedDueno){
      this.dueno = JSON.parse(storedDueno);
    } if (storedMascotas) {
      this.mascotas = JSON.parse(storedMascotas);
    } if (this.user.username) {
      this.method.bienvenida(this.user.username)
    }
  }
  ngOnInit() {
    this.headerName = document.getElementById('header-home');
    this.headerBack = this.headerName.innerHTML + '';
    this.tituleName = document.getElementById('titule-name-home');
  }
  changePage(namePage:string,nameComponent?:string){
    this.method.ingresar(namePage,nameComponent);
  }
  scannerQr(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      if (this.code) {
        this.irMsgEmail(this.code);
        console.log('Barcode data', this.code);
      }
    }).catch(err => {
      console.log(Error, err);
    })
  }

  irMsgEmail(receptor:string){
    this.emailComposer.addAlias('gmail','com.google.android.gm')
    this.emailComposer.isAvailable('gmail');
    this.emailComposer.hasAccount();
    this.emailComposer.open({
      app:'gmail',
      to: receptor,
      subject: 'PetsFound: Mascota encontrada',
    });
  }
  
  changeHeader(canBack:boolean,nameTitle:string){
    const divTitle = `<ion-title id="titule-name-home">${nameTitle}</ion-title>`;
    const divTitleBack = `
    <ion-buttons slot="start">
      <ion-back-button id="button-home-back" style="display: block;"></ion-back-button>
      <ion-title class="titule-padd" id="titule-name-home">${nameTitle}</ion-title>
    </ion-buttons>`;
    if (canBack) {
      this.headerName.innerHTML=divTitleBack;
      let buttonTmp = document.querySelector('#button-home-back') as HTMLElement;
      if (buttonTmp) {
        let homePageThis = this;
        buttonTmp.addEventListener('click',function(){
          homePageThis.retroceder();
        });
      }
    } else {
      this.headerName.innerHTML=divTitle;
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
