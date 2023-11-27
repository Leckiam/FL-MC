import { Component, OnInit, inject } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/class/user/user';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  tituleName:any
  usersDB: User[];
  seg:number;
  public fireBase = inject(FirebaseService);
  constructor(private method:MethodService,private appComponent:AppComponent) {
    this.appComponent.cantLoadPages += 1;
  }
  
  ngOnInit() {
    this.tituleName = document.getElementById('titule-name-login');
  }

  changePage(namePage:string,nameComponent?:string){
    this.method.ingresar(namePage,nameComponent);
  }

  convertirAMinusculas(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
  }
  ionViewWillEnter() {
    if (this.appComponent.cantLoadPages>=2) {
      this.method.ingresar('login','')
      window.location.reload();
    }
  }
}




