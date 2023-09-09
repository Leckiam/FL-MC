import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage implements OnInit {

  userSearch:any = {
    email:'',
    password:''
  }

  constructor(private appComponent:AppComponent) {}

  ngOnInit() {
    let RecoverObj = this
    const content = document.getElementById('content-recover-pf');
    const btn_irLogin = content?.querySelector('#btn-irLogin') as HTMLElement;
    btn_irLogin?.addEventListener('click',function(){
      RecoverObj.changePage('login');
    });
  }
  changePage(namePage:any){
    this.appComponent.ingresar(namePage);
  }
  retroceder() {
    this.appComponent.retroceder();
  }
}
