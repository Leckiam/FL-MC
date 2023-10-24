import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import { HomePage } from 'src/app/pages/home/home.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { PetsService } from 'src/app/services/pets.service';
import { IonicModule } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  mascotas: any[] = []; // Arreglo para almacenar las mascotas
  items = [];
  code: any;
  pagina = 1;
  mascotasPorPagina = 10;

  data:any;
  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  @ViewChild('animar1', { read: ElementRef, static: true })
  animar1!: ElementRef;

  private animation!: Animation;
  constructor(private appComponent:AppComponent,private animationController:AnimationController,private petsService: PetsService, private sanitizer: DomSanitizer, private barcodeScanner: BarcodeScanner, public homepage:HomePage) {
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

  scannerQr(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text
      console.log('Barcode data', this.code);

    }).catch(err => {
      console.log(Error, err);
    })
  }

  
  ionViewWillEnter() {
    this.mascotas = this.petsService.obtenerMascotas();
  }

  cargarMascotas() {
    const nuevasMascotas = this.petsService.obtenerMascotas();
  
    if (nuevasMascotas.length > 0) {
      this.mascotas = nuevasMascotas.slice(0, this.mascotasPorPagina);
      this.pagina++;
    }
  }
  

 
  onIonInfinite(event: CustomEvent<IonInfiniteScroll>) {
    if (event && event.detail) {
      const infiniteScroll = event.detail;

      // Llama a tu servicio para obtener más mascotas
      this.cargarMascotas();

      // Indica a Ionic que se ha completado la carga de datos
      infiniteScroll.complete();
    }
  }


  /*
  getImageUrl(imagen: File): SafeUrl {
    const url = URL.createObjectURL(imagen);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  */
}

