import { Injectable } from '@angular/core';
import { GetCollectionOptions, QueryDocumentSnapshot, FirebaseFirestore as fireBaseStore } from '@capacitor-firebase/firestore';
import { Mascota } from 'src/app/class/mascota/mascota';


@Injectable({
  providedIn: 'root'
})
export class FbmascotaService {

  constructor() { }

  addMascota(idDueno:string,nombre:string,tipo:string,edad:number,descripcion?:string,raza?:string){
    fireBaseStore.addDocument({
      reference: 'Mascota',
      data: {
        nombre:nombre,
        tipo:tipo,
        raza:raza||'',
        edad:edad,
        descripcion:descripcion||'',
        idDueno:idDueno,
      }
    }).then((document) => {
      console.log('La mascota con id = '+document.reference.id+' a sido añadido');
    })
    .catch(() => {
      console.log('No se ha podido agregar la mascota');
    });
  }
  async obtPets(id_dueno:string){
    let option:GetCollectionOptions = {
      reference: 'Mascota',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'idDueno',
            opStr: '==',
            value: id_dueno,
          },
        ],
      },
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'idDueno',
          directionStr: 'desc',
        },
        {
          type: 'limit',
          limit: 10,
        },
      ],
    };
    await fireBaseStore.getCollection(option)
    .then((data) => {
      let mascotas = this.getArrayPets(data.snapshots);
      localStorage.setItem('mascotas',JSON.stringify(mascotas));
      console.log(localStorage.getItem('mascotas'));
    })
    .catch(() => {
      console.log('No se ha encontrado a ninguna mascota con el id_dueno: '+ id_dueno)
      localStorage.setItem('mascotas',JSON.stringify([new Mascota()]));
      console.log(localStorage.getItem('mascotas'));
    });
  }
  getArrayPets(lista:QueryDocumentSnapshot<any>[]){
    let mascotas: Mascota[]=[];
    let mascotaTMP :Mascota;
    for (let i = 0; i < lista.length; i++) {
      const mascota = lista[i].data;
      const id_pet = lista[i].id;
      mascotaTMP = this.getPet(mascota,id_pet);
      mascotas.push(mascotaTMP);
    }
    return mascotas;
  }
  getPet(mascota:any,id_pet:string){
    let mascotaTMP:Mascota = new Mascota();
    mascotaTMP.id = id_pet;
    mascotaTMP.nombre = mascota.nombre;
    mascotaTMP.tipo = mascota.tipo;
    mascotaTMP.raza = mascota.raza;
    mascotaTMP.edad = mascota.edad;
    mascotaTMP.descripcion = mascota.descripcion;
    mascotaTMP.idDueno = mascota.idDueno;
    return mascotaTMP;
  }

  async updatePet(pet:Mascota){
    await fireBaseStore.updateDocument({
      reference: 'Mascota/'+pet.id,
      data: { 
        nombre: pet.nombre, 
        tipo: pet.tipo, 
        raza: pet.raza,
        edad: pet.edad,
        descripcion: pet.descripcion,
      },
    }).then(() => {
      this.obtPets(pet.id)
      console.log('Se actualizo la mascota');
    })
    .catch(async () => {
      console.log('No se actualizo la mascota');
    });
  }
  async deletePet(id_pet:string){
    await fireBaseStore.deleteDocument({
      reference: 'Mascota/'+id_pet,
    });
  }
}
