import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';
import { Mascota } from 'src/app/class/mascota/mascota';
import { ApipetsService } from 'src/app/services/api/pets/apipets.service';
import { User } from 'src/app/class/user/user';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {

  mascotas:Mascota[] = [];
  items:string[] = [];
  MostrarMascotas = false;
  noMascotas=false;

  data:User;
  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  @ViewChild('animar1', { read: ElementRef, static: true })
  animar1!: ElementRef;

  private animation!: Animation;
  constructor(private method:MethodService,private animationController:AnimationController,private petsService: ApipetsService,private homepage:HomePage) {
    this.data = this.homepage.user;
    console.log('hola')
    console.log(this.homepage.user.correo)
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

    console.log(this.data);
  }

  eliminarMascota(mascota:Mascota){
    this.petsService.eliminarMascota(mascota);
  }

  toggleMostrarMascotas() {
    this.MostrarMascotas = !this.MostrarMascotas;
  }

}
