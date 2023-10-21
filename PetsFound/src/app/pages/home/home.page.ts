import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { MethodService } from 'src/app/services/method/method.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  tituleName:any
  constructor(private method:MethodService) {
    this.method.firstTime = false;
    this.method.transfer();
    this.data = localStorage.getItem('user');
  }

  changePage(namePage:string,nameComponent?:string){
    let listaHome = ['inicio','account']
    let tituleHome = ['Inicio','Cuenta']
    if (nameComponent) {
      if (nameComponent && listaHome.includes(nameComponent)) {
        const index = listaHome.indexOf(nameComponent);
        this.tituleName.innerHTML= tituleHome[index];
        if (nameComponent=='inicio') {
          nameComponent=''
        }
      } 
      namePage = namePage + '/' + nameComponent;
    }
    this.method.ingresar(namePage);
  }
}
