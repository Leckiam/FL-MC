import { Component, OnInit } from '@angular/core';
import { MethodService } from 'src/app/services/method/method.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  constructor(private method:MethodService) {}

  ngOnInit() {}
  
  retroceder(){
    this.method.retroceder();
  }

}
