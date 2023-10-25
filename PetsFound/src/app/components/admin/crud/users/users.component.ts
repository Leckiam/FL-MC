import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent  implements OnInit {

  usersDB:User[];
  constructor() { }

  ngOnInit() {}

}
