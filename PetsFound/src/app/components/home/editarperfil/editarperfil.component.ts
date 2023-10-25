import { Component, OnInit } from '@angular/core';
import { Dueno } from 'src/app/class/dueno/dueno';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
})
export class EditarperfilComponent implements OnInit {

  dueno:Dueno = new Dueno();
  constructor(private homepage:HomePage) {
    this.dueno.user = this.homepage.user;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.homepage.changeHeader(true,'Editar perfil');
  }
}
