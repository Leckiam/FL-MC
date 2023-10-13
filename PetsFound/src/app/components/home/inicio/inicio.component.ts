import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import { HomePage } from 'src/app/pages/home/home.page';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  data:any;
  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  @ViewChild('animar1', { read: ElementRef, static: true })
  animar1!: ElementRef;

  private animation!: Animation;
  constructor(private appComponent:AppComponent,private animationController:AnimationController,public homepage:HomePage) {
    this.data = this.appComponent.data;
  }
  ngOnInit() {
    this.homepage.tituleName = document.getElementById('titule-name-home');
  }

  changePage(namePage:string,nameComponent?:string){
    this.appComponent.ingresar(namePage,nameComponent);
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
}
