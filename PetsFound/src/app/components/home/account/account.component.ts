import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { User } from 'src/app/class/user/user';
import { HomePage } from 'src/app/pages/home/home.page';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:User;
  duenos:Dueno[];
  constructor(private method:MethodService, private homepage:HomePage,private fireBase:FirebaseService) {
    this.data = this.homepage.user;
  }

  ngOnInit() {}

  logOut(){
    this.fireBase.logOut();
  }
  IrEditarPerfil() {
    this.method.ingresar('home','editarperfil');
  }
  generateQR() {
    this.method.ingresar('home','generate-qr');
  }

  ionViewWillEnter() {
    console.log('Esto es ionViewWillEnter [/Home]');
    this.homepage.changeHeader(false,'Cuenta');
    this.homepage.seg  = 0;
    console.log(this.data);
  }
}
