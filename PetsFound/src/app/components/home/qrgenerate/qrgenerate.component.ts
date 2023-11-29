import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-qrgenerate',
  templateUrl: './qrgenerate.component.html',
  styleUrls: ['./qrgenerate.component.scss'],
})
export class QrgenerateComponent  implements OnInit {
  qrdata: string; 
  createCode : any;
  constructor(public homepage:HomePage) {
    this.qrdata = this.homepage.user.correo;
  }

  public create(){
    this.createCode = this.qrdata;
  }

  public clear(){
    this.createCode = '';
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Generar QR');
  }
}
