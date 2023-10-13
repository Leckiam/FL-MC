import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:any;
  constructor(private appComponentt:AppComponent, public homepage:HomePage) {
    this.data = this.appComponentt.data;
  }

  ngOnInit() {
  }

  logOut(){
    this.appComponentt.logOut();
  }

}
