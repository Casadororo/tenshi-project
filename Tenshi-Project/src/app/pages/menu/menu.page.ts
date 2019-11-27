import { Component, OnInit } from '@angular/core';
import { CasasService } from '../../services/casas.service'
import { Subscription } from 'rxjs';
import { Casas } from '../../interfaces/casas';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private uid:string;  
  private casasSubscription: Subscription;
  public casas = new Array<Casas>();
  public casasMembros = new Array<Casas>();
  
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
    },
    {
      title: 'Casas Membros',
      open: false,
      children: [
      ]
    }
  ];

  constructor(private casasService:CasasService, private authService:AuthService) {
    
   }

  async ngOnInit() {
    this.uid = await this.authService.getAuth().currentUser.uid;
    this.casasService.createCollection(this.uid);
    this.casasSubscription = this.casasService.getCasas().subscribe(data => {
      this.casas = data;
      //console.log(this.casas);
      this.pages[1].children = this.casas;
    });

    this.casasService.createMembrosCollection(this.uid);
    this.casasSubscription = this.casasService.getCasasMembros().subscribe(data => {
      this.casasMembros = data;
      //console.log(this.casas);
      this.pages[2].children = this.casasMembros;
    });
  }
}
