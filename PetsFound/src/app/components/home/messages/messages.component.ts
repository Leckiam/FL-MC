import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent  implements OnInit {
  code: any;
  data:any;
  constructor(private appComponentt:AppComponent, private homepage: HomePage ) {
    this.data = this.appComponentt.data; 
    this.code = this.homepage.code;
  }

  ngOnInit() {}

  changePage(namePage:any){
    this.appComponentt.ingresar(namePage);
  }

  enviarMsj(){
    this.changePage('home')
    let msg = 'Su mensaje se ha enviado correctamente'
    this.appComponentt.presentToast('top',msg)
  }

}
