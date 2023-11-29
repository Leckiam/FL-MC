import { Injectable } from '@angular/core';
import { FirebaseAuthentication as fireBaseAuth } from '@capacitor-firebase/authentication';
import { MethodService } from '../../method/method.service';
import { User } from 'src/app/class/user/user';

@Injectable({
  providedIn: 'root'
})
export class FbuserService {

  constructor(private method:MethodService) { }
  
  async loginUser(email:string,password:string){
    await fireBaseAuth.signInWithEmailAndPassword({
      email: email.trim(),
      password: password.trim()
    }).then((userCredential) => {
      // Signed in 
      fireBaseAuth.updateProfile({
        displayName: this.method.getUsername(email),
      })
      const userTmp = userCredential.user;
      if (userTmp) {
        let user = new User();
        user.id = userTmp.uid;
        user.username = userTmp.displayName||this.method.getUsername(email);
        user.correo = userTmp.email||'';
        localStorage.setItem('user',JSON.stringify(user));
        console.log(localStorage.getItem('user'));
      }
    })
    .catch((error) => {
      console.log('Error en iniciar sesión');
    });
  }

  logOut(){
    fireBaseAuth.signOut();
    this.method.logOut();
  }

  async recoverPass(correo:string){
    await fireBaseAuth.sendPasswordResetEmail({
      email: correo,
    }).then(() => {
      console.log('entro el recoverPass');
      this.method.presentToast('top','Se ha enviado exitosamente a su correo la solicitud de cambio de contraseña');
    })
    .catch(() => {
      this.method.presentToast('top','No se ha podido enviar la solicitud de cambio de contraseña (correo inválido)');
    });
  };

  async updatePass(newPass:string){
    let user = (await fireBaseAuth.getCurrentUser()).user;
    if (user) {
      fireBaseAuth.updatePassword({
        newPassword: newPass
      })
    }
  }
}
