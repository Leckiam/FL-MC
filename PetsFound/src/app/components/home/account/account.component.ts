import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user/user';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:User = new User();
  nameComponent:any;
  constructor(private method:MethodService, private homepage:HomePage) {
    this.data = this.homepage.user;
  }

  ngOnInit() {
  }

  logOut(){
    this.method.logOut();
  }
  IrEditarPerfil() {
    this.method.ingresar('home', 'editarperfil');
  }

  ionViewWillEnter() {
    this.homepage.changeHeader(false,'Cuenta');
  }
}
