import { Component} from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/class/user/user';
import { MethodService } from 'src/app/services/method/method.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  code: any;
  data:any;
  headerName:any;
  tituleName:any;
  headerBack:any;

  user:User = new User();

  constructor(private method:MethodService, private barcodeScanner: BarcodeScanner, private bbdd:SQLite,private appComponent:AppComponent) {
    this.appComponent.cantLoadPages += 1;
    this.data = this.method.transfer();
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
        this.changePage('home','message');
        console.log('Barcode data', this.code);
      }
    }).catch(err => {
      console.log(Error, err);
    })
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
