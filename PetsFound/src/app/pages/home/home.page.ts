import { Component,ViewChildren,ElementRef, ViewChild } from '@angular/core';
import { IonCard,AnimationController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  @ViewChild('animar1', { read: ElementRef, static: true })
  animar1!: ElementRef;

  private animation!: Animation;
  constructor(private appComponent:AppComponent,private animationController:AnimationController) {
    this.appComponent.transfer()
    this.data = this.appComponent.data;
  }

  changePage(namePage:any){
    this.appComponent.ingresar(namePage);
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
