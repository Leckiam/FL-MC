import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/class/mascota/mascota';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent  implements OnInit {

  petsDB:Mascota[];
  constructor() { }

  ngOnInit() {}

}
