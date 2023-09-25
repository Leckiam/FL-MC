import { Component} from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  tituleName:any
  constructor(private appComponent:AppComponent) {
    this.appComponent.firstTime = false
    this.appComponent.transfer();
    this.data = this.appComponent.data;
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
    this.appComponent.ingresar(namePage);
  }
}
