import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  data:any
  firstTime!:boolean
  isLogin!:boolean
  constructor(private router: Router,private activatedRoute:ActivatedRoute, private navCtrl:NavController, private toastController: ToastController) { }

  retroceder() {
    this.navCtrl.pop();
  }

  bienvenida(data:any){
    let msg1 = 'Bienvenido, '+ data;
    this.presentToast('top', msg1);
    let msg2 = 'Has iniciado sesión con éxito!';
    this.presentToast('bottom', msg2);
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom',msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
    });

    await toast.present();
  }

  transfer(){
    const valor = localStorage.getItem('user')
    console.log(valor);
    if (!valor) {
      this.activatedRoute.queryParams.subscribe(params =>{
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
          localStorage.setItem('user', this.data.usuario);
        } else {
          this.ingresar('login','')
        }
      })
    }
  }

  logOut(){
    localStorage.removeItem('user');
    this.ingresar('login','')
  }

  validarTabsBar(nombrePage:any){
    let listaWhite=['home','account'];
    if (listaWhite.includes(nombrePage)) {
      return true
    } else {
      return false
    }
  }
  
  ingresar(nombrePage:string,nameComponent?:string,navigationExt?:any){
    this.firstTime = false
    if (navigationExt) {
      this.router.navigate(['/'+nombrePage],navigationExt);
    } else {
      if (nameComponent) {
        nombrePage = nombrePage + '/' + nameComponent;
      }
      this.router.navigate(['/'+nombrePage]);
    }
  }

}
