import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data:any;
  constructor(private appComponentt:AppComponent) {
    this.appComponentt.transfer(this.data)
    this.data = this.appComponentt.returnData();
  }

  changePage(namePage:any){
    this.appComponentt.ingresar(namePage);
  }
  mostrarData(){
    console.log(this.data);
  }

}
