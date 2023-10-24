import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { MethodService } from '../method/method.service';
import { User } from 'src/app/class/user/user';
import { ApiusersService } from '../api/users/apiusers.service';

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  public database!: SQLiteObject;
  tblUsers:string = `
    CREATE TABLE IF NOT EXISTS user(
      id INTEGER PRIMARY KEY autoincrement,
      nombre VARCHAR(25) NOT NULL,
      correo VARCHAR(20) NOT NULL UNIQUE,
      username VARCHAR(20) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL,
      isStaff INTEGER NOT NULL);
  `;
  listaUsers = new BehaviorSubject<User[]>([]);
  usersBD:User[];
  private isDbReady:BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite,private platform: Platform,private method:MethodService,private apiUsers:ApiusersService) {
    this.crearBD();
  }
  
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'users.db',
        location: 'default'
      }).then((db:SQLiteObject)=> {
        this.database = db;
        this.method.presentToast("bottom",'BD Creada');
        this.crearTablas();
      }).catch((e) => {
        this.method.presentToast("top",e)
      })
    });
  };
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblUsers, []);
      this.cargarUsersBD();
      this.isDbReady.next(true);
    } catch (error) {
      this.method.presentToast("top","Error en Crear Tabla: " + error);
    }
  }
  cargarUsersBD() {
    let items: User[] = [];
    this.database.executeSql('SELECT * FROM user', [])
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              nombre: res.rows.item(i).nombre,
              correo: res.rows.item(i).correo,
              username: res.rows.item(i).username,
              password: res.rows.item(i).password,
              isStaff: res.rows.item(i).isStaff,
            });
          }
        }
      });
    this.listaUsers.next(items);
  }
  
  async addUsers(data:any) {
    try{
      await this.database.executeSql('INSERT INTO user(nombre,correo,username,password,isStaff)VALUES(?,?,?,?,?);', data);
    } catch{
      this.method.presentToast('bottom','Ha surgido un error en la inserción')
    }
  }
  async deleteTable(tblName: string) {
    const tbl:string = `DROP TABLE IF EXISTS ${tblName};`;
    await this.database.executeSql(tbl, []);
  }
  async deleteUsers(correo: string) {
    try{
      await this.database.executeSql('DELETE FROM user WHERE correo=?', [correo]);
    } catch{
      this.method.presentToast('bottom','Ha surgido un error en la eliminación')
    }
  }
  async deleteDataTabla(nameTbl:string) {
    await this.database.executeSql(`DELETE FROM ${nameTbl};`, []);
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchUsers(): Observable<User[]> {
    return this.listaUsers.asObservable();
  }

  async existeUsersInBD(){
    await this.validarStaff();
    if (this.usersBD.length<1) {
      if (this.apiUsers.usersApi.length<19) {
        window.location.reload();
      }
      let data=[];
      for (let i = 0; i < this.apiUsers.usersApi.length; i++) {
        const userApi = this.apiUsers.usersApi[i];
        data = [userApi.nombre,userApi.correo,userApi.username,userApi.password,userApi.isStaff];
        this.addUsers(data);
      }
    }
  }
  async validarStaff(){
    this.apiUsers.setApiToUsers();
    let istaff = false;
    let rango = 19;
    if (this.usersBD.length < rango) {
      rango = this.usersBD.length;
    }
    for (let i = 0; i < rango; i++) {
      const user = this.usersBD[i];
      if (user.isStaff==1) {
        istaff=true;
      }
    }
    if (!istaff) {
      await this.deleteDataTabla('user');
    }
  }
}
