import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';

@Component({
  selector: 'app-duenos',
  templateUrl: './duenos.component.html',
  styleUrls: ['./duenos.component.scss'],
})
export class DuenosComponent  implements OnInit {

  duenosDB:Dueno[];
  constructor() { }

  ngOnInit() {}

}
