import { Component, OnInit } from '@angular/core';
import { CasasService } from '../../services/casas.service'
import { Subscription } from 'rxjs';
import { Casas } from '../../interfaces/casas';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  private casasSubscription: Subscription;
  public casas = new Array<Casas>();

  pages = [
    {
      title: 'Main',
      url: '/menu/main',
      icon: 'logo-ionic'
    },
    {
      title: 'Casas',
      open: true,
      children: [
      ]
    }
  ];

  constructor(private casasService:CasasService) {
    this.casasService.createCollection("oi");

    this.casasSubscription = this.casasService.getCasas().subscribe(data => {
      this.casas = data;
      //console.log(this.casas);
      this.pages[1].children = this.casas;
    });
   }

  ngOnInit() {

  }

}
