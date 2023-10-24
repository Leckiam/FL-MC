import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

import lottie from 'lottie-web';

@Component({
  selector: 'app-notsfound',
  templateUrl: './notsfound.page.html',
  styleUrls: ['./notsfound.page.scss'],
})
export class NotsfoundPage implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }

  aniamcion404(){
    const container = document.getElementById('lottie-container');
    if (container) {
      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animacion.json',
      });
  }
}
}
