import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import { HomePage } from 'src/app/pages/home/home.page';
import { MethodService } from 'src/app/services/method/method.service';
import { User } from 'src/app/class/user/user';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {

  data:User;
  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  @ViewChild('animar1', { read: ElementRef, static: true })
  animar1!: ElementRef;

  private animation!: Animation;
  constructor(private method:MethodService,private animationController:AnimationController,private homepage:HomePage) {
    this.data = this.homepage.user;
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
  ionViewWillEnter() {
    console.log('Esto es ionViewWillEnter [/Home]');
    this.homepage.changeHeader(false,'Inicio');
    this.homepage.bbdd.crearBD();
    this.homepage.seg  = 0;
    this.homepage.cargarUsersDelay();
    console.log(this.data);
  }
}
