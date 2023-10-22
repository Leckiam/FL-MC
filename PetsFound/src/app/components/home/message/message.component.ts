import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent  implements OnInit {

  code: any;
  data:any;
  constructor(private method:MethodService, private homepage: HomePage ) {
    this.data = this.method.data; 
    this.code = this.homepage.code;
  }

  ngOnInit() {}

  changePage(namePage:any){
    this.method.ingresar(namePage);
  }

  enviarMsj(){
    this.changePage('home')
    let msg = 'Su mensaje se ha enviado correctamente'
    this.method.presentToast('top',msg)
  }

  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Mensaje');
  }
}
