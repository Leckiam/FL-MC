import { Injectable } from '@angular/core';
import { Mascota } from 'src/app/class/mascota/mascota';

@Injectable({
  providedIn: 'root'
})
export class ApipetsService {

  private mascotas: Mascota[] = [];

  constructor() { }
  
  agregarMascota(mascota: Mascota) {
    this.mascotas.push(mascota);
    this.guardarMascotasEnLocalStorage();
  }

  obtenerMascotas(id_user:number) {
    let mascotasTmp:Mascota[]=[]
    this.cargarMascotasDesdeLocalStorage();
    for (let i = 0; i < this.mascotas.length; i++) {
      const mascota = this.mascotas[i];
      if (mascota.dueno.id_user == id_user) {
        mascotasTmp.push(mascota);
      }
    }
    return mascotasTmp;
  }

  private guardarMascotasEnLocalStorage() {
    localStorage.setItem('mascotas', JSON.stringify(this.mascotas));
  }

  private cargarMascotasDesdeLocalStorage() {
    const mascotasStr = localStorage.getItem('mascotas');
    if (mascotasStr) {
      this.mascotas = JSON.parse(mascotasStr);
    }
  }

  editarMascota(id: number, nuevaMascota: any) {
    const index = this.mascotas.findIndex((mascota) => mascota.id === id);
    if (index !== -1) {
      this.mascotas[index] = nuevaMascota;
      this.guardarMascotasEnLocalStorage();
    }
  }

  eliminarMascota(mascota: Mascota) {
    console.log(mascota.nombre)
    const index = this.mascotas.indexOf(mascota);
    console.log(index)
    if (index != -1) {
      this.mascotas.splice(index, 1);
      this.guardarMascotasEnLocalStorage();
    }
  }
}
