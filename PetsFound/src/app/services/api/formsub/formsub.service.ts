import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsubService {

  urlFormSub = 'https://formsubmit.co/';

  constructor(private http: HttpClient) { }

  enviarFormulario(receptor:string,datos: any) {
    this.urlFormSub += receptor
    return this.http.post(this.urlFormSub, datos);
  }
}
