import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.component.html',
  styleUrls: ['./cambiarcontra.component.scss'],
})
export class CambiarcontraComponent  implements OnInit {
  nuevaPassword: string = '';
  confirmPassword: string = '';


  constructor(private homepage:HomePage, private method: MethodService, private fireBase:FirebaseService) { }

  changePassword() {
    if (this.isFormValid()) {
      this.fireBase.updatePass(this.nuevaPassword);
      console.log('Contraseña cambiada con éxito');
      this.method.presentToast('bottom', 'Contraseña cambiada con éxito');
    }else{
      this.method.presentToast('bottom', 'Las contraseñas no coinciden o son inferiores a los 6 digitos');
    }
  }
  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Cambiar contraseña');
  }
  isFormValid(): boolean {
    return this.nuevaPassword == this.confirmPassword && this.nuevaPassword.length >= 6;
  }

  ngOnInit() {}

}
