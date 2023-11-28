import { Injectable } from '@angular/core';
import { FirebaseAuthentication as fireBaseAuth } from '@capacitor-firebase/authentication';
import { FirebaseFirestore as fireBaseStore } from '@capacitor-firebase/firestore';
import { ApiusersService } from '../api/users/apiusers.service';
import { User } from 'src/app/class/user/user';
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(private apiUsers:ApiusersService) {
  }

  async addUser(email:string,password:string,username:string,nombre:string,celular?:number,edad?:number){
    await fireBaseAuth.createUserWithEmailAndPassword({
      email: email,
      password: password
    }).then(async (userCredential) => {
      // Signed in 
      await fireBaseAuth.updateProfile({
        displayName: username
      });
      const user = userCredential.user;
      let user_id =  user?.uid;
      if (user_id) {
        console.log(JSON.stringify(user_id))
        await this.addDueno(email,nombre,'','',912345678,18,user_id);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  async addDueno(email:string,nombre:string,ap_paterno:string,ap_materno:string,celular:number,edad:number,idUser:string){
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
    });
    console.log('Hola dueno')
  }
  async loginUser(email:string,password:string){
    await fireBaseAuth.signInWithEmailAndPassword({
      email: email.trim(),
      password: password.trim()
    }).then((userCredential) => {
      // Signed in 
      const userTmp = userCredential.user;
      let user = {
        id: userTmp?.uid,
        username: userTmp?.displayName,
        correo: userTmp?.email,
      }
      const userJson = JSON.stringify(user);
      console.log('entro');
      console.log(userJson);
      localStorage.setItem('user',userJson);
    })
    .catch((error) => {
      console.log('o no entro error');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
  async obtUsers(){
    await fireBaseStore.getCollection({
      reference: 'Dueno',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'born',
            opStr: '==',
            value: 1912,
          },
        ],
      },
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'born',
          directionStr: 'desc',
        },
        {
          type: 'limit',
          limit: 10,
        },
      ],
    }).then((data) => {
      console.log(data.snapshots.length)
    });
  }

  logOut(){
    fireBaseAuth.signOut();
  }

  async existeUsersInBD(){
    await this.validarStaff();
    console.log('validacion hecha (fuera de validarStaff())');
    if (this.apiUsers.usersApi.length<19) {
      window.location.reload();
    } else {
      for (let i = 0; i < this.apiUsers.usersApi.length; i++) {
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
