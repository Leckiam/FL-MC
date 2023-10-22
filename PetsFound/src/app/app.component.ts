import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  cantLoadPages!:number;
  constructor() { 
    this.cantLoadPages = 0;
  }
}
