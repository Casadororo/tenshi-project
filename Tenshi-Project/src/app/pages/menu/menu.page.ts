import { Component, OnInit } from '@angular/core';
import { CasasService } from '../../services/casas.service'
import { Subscription } from 'rxjs';
import { Casas } from '../../interfaces/casas';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private uid: string;
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

  constructor(private casasService: CasasService, private authService: AuthService, private alertCtrl: AlertController) {
  }

  async ngOnInit() {
    this.uid = await this.authService.getAuth().currentUser.uid;
    this.casasService.createCollection(this.uid);
    this.casasSubscription = this.casasService.getCasas().subscribe(data => {
      this.casas = data;
      //console.log(this.casas);
      this.pages[1].children = this.casas;
    });

    this.casasService.createCasasMembrosCollection(this.uid);
    this.casasSubscription = this.casasService.getCasasMembros().subscribe(data => {
      this.casasMembros = data;
      //console.log(this.casas);
      this.pages[2].children = this.casasMembros;
    });
  }

  async createHome(title:string, icon:string) {
    const casa:Casas = {
      title:title,
      owner:this.uid,
      icon:icon
    };
    this.casasService.addHome(casa);
  }

  async addAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Criar uma nova Casa',
      mode: 'ios',
      message: 'Coloque um <strong>Nome</strong> e um <strong>Icone</strong> se souber algum',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nome',
        },
        {
          name: 'icon',
          type: 'text',
          placeholder: 'Icone'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Adicionar',
          handler: data => {
            this.createHome(data.title, data.icon);
          }
        }
      ]
    });

    await alert.present();
  }
}

