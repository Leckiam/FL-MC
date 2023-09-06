import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  constructor(private appComponent:AppComponent) {
    this.appComponent.transfer(this.data)
    this.data = this.appComponent.returnData();
  }

  changePage(namePage:any){
    this.appComponent.ingresar(namePage);
  }
}
