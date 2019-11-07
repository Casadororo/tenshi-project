import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
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
        {
        title: 'Casa1',
        url: '/menu/tabs',
        homeId: "123",
        icon: 'logo-ionic'
      },
      {
        title: 'Casa2',
        url: '/menu/tabs',
        homeId: "654",
        icon: 'logo-google'
      }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
