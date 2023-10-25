import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dueno } from 'src/app/class/dueno/dueno';
import { User } from 'src/app/class/user/user';
import { ApiusersService } from '../users/apiusers.service';

@Injectable({
  providedIn: 'root'
})
export class ApiduenosService {

  //URL:string='https://jsonplaceholder.typicode.com';
  apiUrl = 'https://raw.githubusercontent.com/Leckiam/FL-MC/Maikel-C/PetsFound/usuarios_PGY4121_04.json';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    }),
  };

  duenosApi:Dueno[]= [];
  duenos:Dueno[]= [];

  constructor(private http:HttpClient, private apiUser:ApiusersService) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setApiToUsers(user:User){
    this.getData().subscribe((data) => {
      const dataUsers = data.duenos;
      this.duenosApi = dataUsers;
      this.guardarDuenosApi(user)
    })
  }

  guardarDuenosApi(user:User){
    let duenoTmp:Dueno;
    for (let i = 0; i < this.duenosApi.length; i++) {
      const dueno = this.duenosApi[i];
      if (user.id==dueno.id_user) {
        duenoTmp = this.buscarDueno(user)
        if (!duenoTmp.celular) {
          this.editarDueno(user,dueno)
        }
      } else {
        this.agregarDueno(dueno);
      }
    }
  }
  
  agregarDueno(dueno: Dueno) {
    this.duenos.push(dueno);
    this.guardarDuenosEnLocalStorage();
  }

  obtenerDuenos() {
    this.cargarDuenosDesdeLocalStorage();
    return this.duenos;
  }

  buscarDueno(user:User){
    let duenoTmp:Dueno = new Dueno();
    this.cargarDuenosDesdeLocalStorage();
    for (let i = 0; i < this.duenos.length; i++) {
      const dueno = this.duenos[i];
      if (dueno.id_user == user.id) {
        duenoTmp=dueno;
        break;
      }
    }
    if (!duenoTmp.id) {
      duenoTmp.id = user.id;
      duenoTmp.nombre = user.nombre;
      duenoTmp.correo = user.correo;
      duenoTmp.id_user = user.id;
      this.agregarDueno(duenoTmp);
    }
    return duenoTmp;
  }
  
  private guardarDuenosEnLocalStorage() {
    localStorage.setItem('duenos', JSON.stringify(this.duenos));
  }

  private cargarDuenosDesdeLocalStorage() {
    const duenosStr = localStorage.getItem('duenos');
    if (duenosStr) {
      this.duenos = JSON.parse(duenosStr);
    }
  }

  editarDueno(user: User, nuevoDueno: any) {
    let duenoTmp = this.buscarDueno(user)
    const index = this.duenos.indexOf(duenoTmp);
    if (index !== -1) {
      this.duenos[index] = nuevoDueno;
      this.guardarDuenosEnLocalStorage();
    }
  }

  eliminarDueno(dueno: Dueno) {
    const index = this.duenos.indexOf(dueno);
    if (index !== -1) {
      this.duenos.splice(index, 1);
      this.guardarDuenosEnLocalStorage();
    }
  }

}
