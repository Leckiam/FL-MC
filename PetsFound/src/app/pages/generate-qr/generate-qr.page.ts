import { Component, OnInit } from '@angular/core';
import { QRCodeModule} from 'angularx-qrcode';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {
  qrdata: string = 'Colorin'; 
  createCode : any;

  constructor(public navCtrl: NavController, public angularqrCode: QRCodeModule) {

   }

   public create(){
    this.createCode = this.qrdata;
   }

   public clear(){
    this.createCode = '';
   }

  ngOnInit() {
  }

  obtnUser(){
      const user = localStorage.getItem('user');

      if (user) {
        this.qrdata = user;
      } else {
        console.error('No se encontró un nombre de usuario en el localStorage');
      }
  }

}
