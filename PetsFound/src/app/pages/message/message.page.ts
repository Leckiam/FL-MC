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
    this.appComponentt.transfer(this.data)
    this.data = this.appComponentt.returnData();
  }

  ngOnInit() {
  }

  changePage(namePage:any){
    this.appComponentt.ingresar(namePage);
  }

}
