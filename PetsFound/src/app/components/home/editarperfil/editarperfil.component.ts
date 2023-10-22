import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
})
export class EditarperfilComponent  implements OnInit {

  constructor(private homepage:HomePage) { }

  ngOnInit() {}


  ionViewWillEnter() {
    this.homepage.changeHeader(false,'Editar perfil');
  }
}
