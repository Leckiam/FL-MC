import { Injectable } from '@angular/core';
import { GetCollectionOptions, FirebaseFirestore as fireBaseStore } from '@capacitor-firebase/firestore';
import { Dueno } from 'src/app/class/dueno/dueno';
import { User } from 'src/app/class/user/user';

@Injectable({
  providedIn: 'root'
})
export class FbduenoService {

  constructor() { }

  addDueno(idUser:string,email:string,nombre:string,ap_paterno?:string,ap_materno?:string,celular?:number,edad?:number){
    fireBaseStore.addDocument({
      reference: 'Dueno',
      data: {
        email:email,
        nombre:nombre,
        ap_paterno:ap_paterno||'',
        ap_materno:ap_materno||'',
        edad:edad||18,
        celular:celular||912345678,
        idUser:idUser,
      }
    }).then((document) => {
      console.log('El dueno con id = '+document.reference.id+' a sido añadido');
    })
    .catch(() => {
      console.log('No se ha podido agregar al dueno');
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
    console.log(JSON.stringify(option));
    await fireBaseStore.getCollection(option)
    .then((data) => {
      let duenoTMP = data.snapshots[0].data;
      let id_dueno = data.snapshots[0].id;
      let dueno = this.getDueno(duenoTMP,id_dueno)
      localStorage.setItem('dueno',JSON.stringify(dueno))
      console.log(localStorage.getItem('dueno'));
    })
    .catch(async () => {
      console.log('No se ha encontrado a ningun dueno que posea el correo: '+ correo);
      let lsUser = localStorage.getItem('user');
      console.log(lsUser);
      let user :User;
      if (lsUser) {
        user = JSON.parse(lsUser);
        this.addDueno(user.id,user.correo,user.nombre);
      }
    });
  }
  getDueno(duenoFB:any,id_dueno:string){
    let dueno : Dueno = new Dueno();
    dueno.id = id_dueno;
    dueno.correo = duenoFB.email;
    dueno.nombre = duenoFB.nombre;
    dueno.ap_paterno = duenoFB.ap_paterno;
    dueno.ap_materno = duenoFB.ap_materno;
    dueno.celular = duenoFB.celular;
    dueno.edad = duenoFB.edad;
    dueno.idUser = duenoFB.idUser;
    return dueno;
  }
  async updateDueno(dueno:Dueno){
    await fireBaseStore.updateDocument({
      reference: 'Dueno/'+dueno.id,
      data: { 
        nombre: dueno.nombre, 
        ap_paterno: dueno.ap_paterno, 
        ap_materno: dueno.ap_materno,
        celular: dueno.celular,
        edad: dueno.edad,
      },
    }).then(() => {
      localStorage.setItem('dueno',JSON.stringify(dueno));
      console.log('Si se actualizo el dueno');
    })
    .catch(async () => {
      console.log('No se actualizo el dueno');
    });
  }
  async deleteDueno(id_dueno:string){
    await fireBaseStore.deleteDocument({
      reference: 'Dueno/'+id_dueno,
    });
  }
}
