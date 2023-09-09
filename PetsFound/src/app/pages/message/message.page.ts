import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  data:any;
  constructor(private appComponentt:AppComponent) {
    this.appComponentt.transfer()
    this.data = this.appComponentt.data;
  }

  ngOnInit() {
  }
  retroceder() {
    this.appComponentt.retroceder();
  }
  changePage(namePage:any){
    this.appComponentt.ingresar(namePage);
  }

  enviarMsj(){
    this.changePage('home')
    let msg = 'Su mensaje se ha enviado correctamente'
    this.appComponentt.presentToast('top',msg)
  }
}
