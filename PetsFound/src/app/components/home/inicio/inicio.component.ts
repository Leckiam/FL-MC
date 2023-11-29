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


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {

  mascotas:Mascota[];
  items:string[] = [];
  MostrarMascotas = false;
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

  changePage(namePage:string,nameComponent?:string){
    this.method.ingresar(namePage,nameComponent);
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

  ionViewWillEnter() {
    console.log('Esto es ionViewWillEnter [/Home]');
    this.homepage.changeHeader(false,'Inicio');
    console.log(JSON.stringify(this.data));
  }

  async eliminarMascota(mascota:Mascota){
    this.fireBase.deletePet(mascota.id);
    await this.fireBase.obtPets(this.dueno.id);
    this.homepage.mascotas = JSON.parse(localStorage.getItem('mascotas')||'[]');
    this.MostrarMascotas = !this.MostrarMascotas;
  }

  toggleMostrarMascotas() {
    this.fireBase.obtPets(this.dueno.id);
    this.mascotas = this.homepage.mascotas;
    this.MostrarMascotas = !this.MostrarMascotas;
  }

}
