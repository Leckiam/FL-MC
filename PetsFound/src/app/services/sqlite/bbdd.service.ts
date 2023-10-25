import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { MethodService } from '../method/method.service';
import { User } from 'src/app/class/user/user';
import { ApiusersService } from '../api/users/apiusers.service';
import { Mascota } from 'src/app/class/mascota/mascota';
import { Dueno } from 'src/app/class/dueno/dueno';

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
  tblPets:string = `
    CREATE TABLE IF NOT EXISTS mascota(
      id INTEGER PRIMARY KEY autoincrement,
      nombre VARCHAR(25) NOT NULL,
      tipo VARCHAR(20) NOT NULL,
      raza VARCHAR(20) NULL,
      edad VARCHAR(20) NOT NULL,
      descripcion TEXT NOT NULL,
      id_dueno INTEGER NOT NULL,
      FOREIGN KEY (id_dueno) REFERENCES dueno(id));
  `;
  tblDuenos:string = `
    CREATE TABLE IF NOT EXISTS dueno(
      id INTEGER PRIMARY KEY autoincrement,
      correo VARCHAR(25) NOT NULL UNIQUE,
      nombre VARCHAR(20) NOT NULL,
      ap_paterno VARCHAR(20) NOT NULL,
      ap_materno VARCHAR(20) NULL,
      edad INTEGER NOT NULL,
      celular INTEGER NOT NULL UNIQUE,
      id_user INTEGER NOT NULL UNIQUE,
      FOREIGN KEY (id_user) REFERENCES user(id));
  `;


  listaUsers = new BehaviorSubject<User[]>([]);
  
  usersBD:User[];

  private isDbReady:BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite,private platform: Platform,private method:MethodService,private apiUsers:ApiusersService) {}
  
  crearBD() {
    localStorage.removeItem('createTable');
    localStorage.removeItem('createBD');
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'users.db',
        location: 'default'
      }).then((db:SQLiteObject)=> {
        this.database = db;
        this.crearAllTablas();
      }).catch((e) => {
        this.method.presentToast("top",e)
      })
    });
  };
  async crearAllTablas(){
    localStorage.setItem('createTable','start')
    await this.crearTablaUser();
    console.log('Cargaron todas las tablas')
    localStorage.setItem('createTable','end')
    localStorage.setItem('createBD','true');
  }
  async crearTablaUser() {
    try {
      await this.database.executeSql(this.tblUsers, []);
      this.cargarUsersBD();
      console.log('Tabla User creada');
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
    console.log('Lista User cargada');
    this.listaUsers.next(items);
  }
  
  async addValuesInTable(data:any,columns:string[],table:string) {
    let cantValues = '';
    let nameColumns ='';
    for (let i = 0; i < columns.length; i++) {
      nameColumns += columns[i]+',';
      cantValues += '?,'
    }
    nameColumns.substring(0,nameColumns.length-1);
    cantValues.substring(0,cantValues.length-1);
    try{
      await this.database.executeSql(`INSERT INTO ${table}(${columns})VALUES(?,?,?,?,?);`, data);
    } catch{
      console.log('Error de insercion de:' + data)
      this.method.presentToast('bottom','Ha surgido un error en la inserción');
    }
  }
  deleteTable(tblName: string) {
    const tbl:string = `DROP TABLE IF EXISTS ${tblName};`;
    this.database.executeSql(tbl, []);
  }
  deleteDataTableForColumn(valor:string,column:string,table:string) {
    try{
      this.database.executeSql(`DELETE FROM ${table} WHERE ${column}=?;`, [valor]);
    } catch{
      this.method.presentToast('bottom','Ha surgido un error en la eliminación')
    }
  }
  deleteDataTabla(nameTbl:string) {
    this.database.executeSql(`DELETE FROM ${nameTbl};`, []);
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchUsers(): Observable<User[]> {
    return this.listaUsers.asObservable();
  }

  async existeUsersInBD(){
    await this.validarStaff();
    console.log('validacion hecha (fuera)');
    console.log(this.usersBD.length)
    if (this.usersBD.length<=1) {
      if (this.apiUsers.usersApi.length<19) {
        window.location.reload();
      }
      let data=[];
      for (let i = 0; i < this.apiUsers.usersApi.length; i++) {
        const userApi = this.apiUsers.usersApi[i];
        data = [userApi.nombre,userApi.correo,userApi.username,userApi.password,userApi.isStaff];
        this.addValuesInTable(data,['nombre','correo','username','password','isStaff'],'user');
      }
    }
  }
  async validarStaff(){
    this.apiUsers.setApiToUsers();
    console.log('validacion hecha (dentro)');
  }
  
}
