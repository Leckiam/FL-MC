import { Component } from '@angular/core';
import { User } from './class/user/user';
import { UserdefaultService } from './services/api/users/userdefault.service';
import { BbddService } from './services/sqlite/bbdd.service';
import { MethodService } from './services/method/method.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  cantLoadPages!:number;
  usersApi:[User]=[new User];
  usersDB:[User]=[new User];
  constructor(private apiUsers:UserdefaultService, private bbdd:BbddService,private method:MethodService) { 
    this.cantLoadPages = 0;
  }

  ngOnInit() {
    this.apiUsers.apiUsers(this.usersApi);
    this.bbdd.dbState().subscribe((res: any) =>{
      if(res){
        this.bbdd.fetchUsers().subscribe((item: any) =>{
          this.usersDB = item;
        })
      }
    });
    this.bbdd.deleteAllUsers();
    this.existeUsersInBD();
  }
  existeUsersInBD(){
    for (let i = 0; i < this.usersApi.length; i++) {
      const userApi = this.usersApi[i];
      let data=[];
      this.method.presentToast('top',userApi.username)
      if (!this.usersDB.includes(userApi)) {
          data = [userApi.correo,userApi.nombre,userApi.username,userApi.password,userApi.isStaff];
          this.bbdd.addUsers(data);
      }
    }
  }
}
