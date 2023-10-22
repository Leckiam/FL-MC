import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HomePage } from 'src/app/pages/home/home.page';
import { Router } from '@angular/router';
import { EditarperfilComponent } from '../editarperfil/editarperfil.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:any;
  constructor(private router: Router, private appComponentt:AppComponent, public homepage:HomePage) {
    this.data = this.appComponentt.data;
  }

  ngOnInit() {
  }

  logOut(){
    this.appComponentt.logOut();
  }

 IrEditarPerfil() {
    this.appComponentt.ingresar('home', 'editarperfil');
  }

  generateQR() {
    this.appComponentt.ingresar('generate-qr')
  }
}
