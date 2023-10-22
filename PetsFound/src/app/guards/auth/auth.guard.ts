import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data!:any;
  navCtl=inject(NavController);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.data = localStorage.getItem('user');
      if (route.component?.name) {
        let routeName = route.component?.name;
        routeName = routeName.substring(0,routeName.length-4).toLowerCase()
        this.validarData(routeName);
        return true;
      }
    return false;
  }
  validarData(namePage:string){
    if (this.data) {
      return this.switchNamePage(namePage,true);
    } else{
      return this.switchNamePage(namePage);
    }
  }
  falseAuth(namePage:string){
    this.navCtl.navigateRoot('/'+namePage);
    return false;
  }

  switchNamePage(namePage:string,dato?:boolean){
    switch (namePage){
      case 'home':
        if (!dato) {
          return this.falseAuth('login');
        }
        break;
      case 'login':
        if (dato) {
          return this.falseAuth('home');
        }
        break;
    }
    return true;
  }
  
}
