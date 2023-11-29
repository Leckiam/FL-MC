import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.component.html',
  styleUrls: ['./cambiarcontra.component.scss'],
})
export class CambiarcontraComponent  implements OnInit {
  NuevaPassword: string = '';
  confirmPassword: string = '';


  constructor( private homepage:HomePage,) { }


  ChangePassword() {
    if (this.isFormValid()) {
    
      console.log('Contraseña cambiada con éxito');
    }
  }

  isFormValid(): boolean {
 
    return this.NuevaPassword === this.confirmPassword && this.NuevaPassword !== '';
  }

  ngOnInit() {}

}
