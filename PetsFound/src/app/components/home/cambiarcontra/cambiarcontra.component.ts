import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.component.html',
  styleUrls: ['./cambiarcontra.component.scss'],
})
export class CambiarcontraComponent  implements OnInit {
  NuevaPassword: string = '';
  confirmPassword: string = '';


  constructor( private homepage:HomePage, private method: MethodService) { }


  async ChangePassword() {
    if (this.isFormValid()) {
      this.method.presentToast('bottom', 'Contraseña cambiada con éxito');
    } else {
      this.method.presentToast('bottom', 'Las contraseñas no coinciden o están vacías');
    }
  }

  isFormValid(): boolean {
 
    return this.NuevaPassword === this.confirmPassword && this.NuevaPassword !== '';
  }

 

  ngOnInit() {}

}
