import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  implements OnInit {

  data:any;
  constructor(private method:MethodService, public homepage:HomePage) {
    this.data = this.homepage.data;
    console.log(this.data)
  }

  ngOnInit() {
  }

  logOut(){
    this.method.logOut();
  }

}
