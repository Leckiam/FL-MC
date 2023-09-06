import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  data:any;
  constructor(private appComponentt:AppComponent) {
    this.appComponentt.transfer(this.data)
    this.data = this.appComponentt.returnData();
  }
  ngOnInit() {
  }

  changePage(namePage:any,nro?:any){
    if (nro==1) {
      this.appComponentt.logOut();
    }
    this.appComponentt.ingresar(namePage);
  }
}
