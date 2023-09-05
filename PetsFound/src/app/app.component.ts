import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  data:any
  constructor(private activateRoute: ActivatedRoute,private router: Router) { 
    this.data = '';
  }

  estadoData(datotmp:any){
    if (this.data=='') {
      console.log('true')
      return true;
    } else {
      this.data=datotmp;
      console.log('false')
      return false;
    }
  }

  returnData(){
    return this.data;
  }

  transfer(datotmp:any){
    if (this.estadoData(datotmp)) {
      this.activateRoute.queryParams.subscribe(params =>{
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
          console.log(this.data)
          datotmp = this.data;
        } else {
          this.ingresar('login');
        }
      });
    }
  }
  ingresar(nombrePage:any,navigationExt?:any){
    if (navigationExt) {
      this.router.navigate(['/'+nombrePage],navigationExt);
      console.log('True');
      console.log(navigationExt)
    } else {
      this.router.navigate(['/'+nombrePage]);
      console.log('False');
      console.log(navigationExt)
    }
  }

}
