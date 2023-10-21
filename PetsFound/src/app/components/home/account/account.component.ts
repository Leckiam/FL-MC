import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:any='Hola xd';
  nameComponent:any;
  constructor(private method:MethodService, public homepage:HomePage) {
    this.data = this.homepage.data;
  }

  ngOnInit() {
  }

  logOut(){
    this.method.logOut();
  }
  ionViewWillEnter() {
    this.homepage.tituleName.innerHTML='Cuenta';
  }

}
