import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data:any;
  navCtl=inject(NavController);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.data = localStorage.getItem('user');
      let  routeName=localStorage.getItem('namePage')
      if (!routeName) {
        routeName='default';
      }
      return this.validarData(routeName);
  }
  validarData(namePage:string){
    switch(namePage){
      case 'login':
        if (this.data != null) {
          return this.falseAuth('home');
        }
        break;
      case 'home':
        if (this.data == null) {
          return this.falseAuth('login');
        }
        break;
      default:
        if (this.data != null) {
          return this.falseAuth('home');
        } else {
          return this.falseAuth('login');
        }
    }
    localStorage.removeItem('namePage');
    return true;
  }

  falseAuth(namePage:string){
    localStorage.setItem('namePage',namePage);
    this.navCtl.navigateRoot('/'+namePage);
    return false;
  }
}
