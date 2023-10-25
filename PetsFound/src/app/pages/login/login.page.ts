import { Component, OnInit, inject } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/class/user/user';
import { MethodService } from 'src/app/services/method/method.service';
import { BbddService } from 'src/app/services/sqlite/bbdd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  tituleName:any
  usersDB: User[];
  seg:number;
  public bbdd = inject(BbddService);
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
  cargarUsersDelay(){
    const estadoTbls = localStorage.getItem('createTable');
    if (estadoTbls=='end') {
      console.log('entra return xd')
      this.cargarUsers();
      return;
    } else if(this.seg==7){
      this.method.presentToast('top','No se ha cargado la BBDD, favor de cerrar y abrir la app');
      return;
    }
    this.seg +=1;
    setTimeout(() => this.cargarUsersDelay(), 1000);
  }
  cargarUsers(){
    this.bbdd.dbState().subscribe((res: any) =>{
      if(res){
        this.bbdd.fetchUsers().subscribe((item: any) =>{
          this.usersDB = item;
          this.bbdd.usersBD = this.usersDB;
        })
      }
    });
  }
}




