import { Component} from '@angular/core';
import { MethodService } from 'src/app/services/method/method.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  tituleName:any;
  constructor(private method:MethodService) {
    this.data = this.method.transfer();
    localStorage.setItem('firstTime','true');
  }
  ngOnInit() {
    this.tituleName = document.getElementById('titule-name-home');
  }
  changePage(namePage:string,nameComponent?:string){
    this.method.ingresar(namePage,nameComponent);
  }
}
