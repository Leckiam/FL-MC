import { Component, OnInit } from '@angular/core';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  data:any;
  constructor(private method:MethodService) {
    this.data = this.method.data;
  }

  ngOnInit() {
  }

  changePage(namePage:any){
    this.method.ingresar(namePage);
  }

  enviarMsj(){
    this.changePage('home')
    let msg = 'Su mensaje se ha enviado correctamente'
    this.method.presentToast('top',msg)
  }
  retroceder() {
    this.method.retroceder();
  }
}
