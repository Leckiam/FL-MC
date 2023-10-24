import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pagina = 1;
  mascotasPorPagina = 10;
  private mascotas: any[] = [];

  constructor() {}

 
  agregarMascota(mascota: any) {
    this.mascotas.push(mascota);
    this.guardarMascotasEnLocalStorage();
  }


  obtenerMascotas() {
    this.cargarMascotasDesdeLocalStorage();
    return this.mascotas;
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