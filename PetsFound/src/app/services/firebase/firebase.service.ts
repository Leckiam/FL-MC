import { Injectable } from '@angular/core';
import { User as UserFB, FirebaseAuthentication as fireBaseAuth } from '@capacitor-firebase/authentication';
import { GetCollectionOptions, FirebaseFirestore as fireBaseStore } from '@capacitor-firebase/firestore';
import { ApiusersService } from '../api/users/apiusers.service';
import { MethodService } from '../method/method.service';
import { User } from 'src/app/class/user/user';
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private apiUsers:ApiusersService, private method:MethodService) {}

  async addUser(email:string,password:string,username:string,nombre:string,celular?:number,edad?:number){
    await fireBaseAuth.createUserWithEmailAndPassword({
      email: email,
      password: password
    }).then((userCredential) => {
      let user_id;
      if (userCredential.user) {
        const user:UserFB = userCredential.user;
        user_id =  user.uid;
      }
      if (user_id) {
        console.log(JSON.stringify(user_id))
        console.log(user_id)
        this.addDueno(email,nombre,'','',912345678,18,user_id);
      }
    })
    .catch((error) => {
      this.method.presentToast('top','La direccion de email/correo ya esta en uso por otro usuario');
    });
  }
  addDueno(email:string,nombre:string,ap_paterno:string,ap_materno:string,celular:number,edad:number,idUser:string){
    fireBaseStore.addDocument({
      reference: 'Dueno',
      data: {
        email:email,
        nombre:nombre,
        ap_paterno:ap_paterno,
        ap_materno:ap_materno,
        edad:edad,
        celular:celular,
        idUser:idUser,
      }
    }).then((document) => {
      console.log('El dueno con id = '+document.reference.id+' a sido añadido');
    })
    .catch(() => {
      console.log('No se ha podido agregar al dueno');
    });
  }
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
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
  async obtDueno(correo:string){
    let option:GetCollectionOptions = {
      reference: 'Dueno',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'email',
            opStr: '==',
            value: correo.trim(),
          },
        ],
      },
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'email',
          directionStr: 'desc',
        },
        {
          type: 'limit',
          limit: 1,
        },
      ],
    };
    await fireBaseStore.getCollection(option)
    .then((data) => {
      let dueno = data.snapshots[0].data;
      localStorage.setItem('dueno',JSON.stringify(dueno))
      console.log(localStorage.getItem('dueno'));
    })
    .catch(() => {
      console.log('No se ha encontrado a ningun dueno que posea el correo: '+ correo)
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

  async existeUsersInBD(){
    await this.validarStaff();
    console.log('validacion hecha (fuera de validarStaff())');
    if (this.apiUsers.usersApi.length!=19) {
      window.location.reload();
    } else {
      console.log('entro else')
      for (let i = 0; i < 19; i++) {
        const userApi = this.apiUsers.usersApi[i];
        this.addUser(userApi.correo,userApi.password,userApi.username,userApi.nombre);
      }
    }
  }
  async validarStaff(){
    this.apiUsers.setApiToUsers();
    console.log('validacion hecha (dentro de validarStaff())');
  }
}
