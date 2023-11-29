import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';
import { Mascota } from 'src/app/class/mascota/mascota';
import { User } from 'src/app/class/user/user';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Dueno } from 'src/app/class/dueno/dueno';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {

  mascotas:Mascota[];
  items:string[] = [];
  mostrarMascotas = false;
  noMascotas=false;

  data:User;
  dueno:Dueno;
  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  @ViewChild('animar1', { read: ElementRef, static: true })
  animar1!: ElementRef;

  private animation!: Animation;
  constructor(private method:MethodService,private animationController:AnimationController,public homepage:HomePage,private fireBase:FirebaseService) {
    this.data = this.homepage.user;
    this.dueno = this.homepage.dueno;
    this.mascotas = this.homepage.mascotas;
  }

  changePage(namePage:string,nameComponent?:string,clase?:Mascota|Dueno|User){
    if (this.mascotas.length >= 10) {
      return;
    }
    this.mostrarMascotas = false;
    localStorage.setItem('clase',JSON.stringify(clase));
    this.method.ingresar(namePage,nameComponent);
    this.mostrarMascotas = false;
  }

  ngAfterViewInit(){
    const cardA = this.animationController
    .create()
    .addElement(this.cardElements.get(1)!.nativeElement)
    .duration(1250)
    .iterations(Infinity)
    .direction('alternate')
    .fromTo('background', '#11a070', 'var(--background)');
    const cardB = this.animationController
    .create()
    .addElement(this.cardElements.get(2)!.nativeElement)
    .duration(1000)
    .iterations(Infinity)
    .direction('alternate')
    .fromTo('background', '#11a070', 'var(--background)');
    this.animation=this.animationController
    .create()
    .duration(3000)
    .iterations(Infinity)
    .addAnimation([cardA,cardB]);

    this.animation.play();
  }

  ngOnInit() {}

  async getsClases(){
    if (localStorage.getItem('dueno')) {
      await this.fireBase.obtDueno(this.data.correo);
      this.homepage.dueno = JSON.parse(localStorage.getItem('dueno')||'[]');
      this.dueno = this.homepage.dueno;
      await this.fireBase.obtPets(this.dueno.id);
      this.homepage.mascotas = JSON.parse(localStorage.getItem('mascotas')||'[]');
      this.mascotas = this.homepage.mascotas;
    }
  }
  ionViewWillEnter() {
    console.log('Esto es ionViewWillEnter [/Home]');
    this.homepage.changeHeader(false,'Inicio');
    this.getsClases();
  }

  async eliminarMascota(mascota:Mascota){
    this.fireBase.deletePet(mascota.id);
    await this.fireBase.obtPets(this.dueno.id);
    this.homepage.mascotas = JSON.parse(localStorage.getItem('mascotas')||'[]');
    this.mostrarMascotas = !this.mostrarMascotas;
  }

  toggleMostrarMascotas() {
    this.fireBase.obtPets(this.dueno.id);
    this.homepage.mascotas = JSON.parse(localStorage.getItem('mascotas')||'[]')
    this.mascotas = this.homepage.mascotas;
    this.mostrarMascotas = !this.mostrarMascotas;
  }

}
