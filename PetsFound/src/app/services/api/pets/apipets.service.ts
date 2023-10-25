import { Injectable } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { Mascota } from 'src/app/class/mascota/mascota';
import { HomePage } from 'src/app/pages/home/home.page';

@Injectable({
  providedIn: 'root'
})
export class ApipetsService {

  pagina = 1;
  mascotasPorPagina = 10;
  private mascotas: Mascota[] = [];
  dueno: Dueno = new Dueno();  // Crea una instancia de Dueno para el formulario

  constructor() { }
  
  agregarMascota(mascota: Mascota) {
    this.mascotas.push(mascota);
    this.guardarMascotasEnLocalStorage();
  }


  obtenerMascotas(idDueno: number) {
    let mascotasTmp: Mascota[] = [];
    this.cargarMascotasDesdeLocalStorage();
    for (let i = 0; i < this.mascotas.length; i++) {
      const mascota = this.mascotas[i];
      if (mascota.dueno.id == idDueno) {
        mascotasTmp.push(mascota)
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

  eliminarMascota(id: number) {
    const index = this.mascotas.findIndex((mascota) => mascota.id === id);
    if (index !== -1) {
      this.mascotas.splice(index, 1);
      this.guardarMascotasEnLocalStorage();
    }
  }
}
