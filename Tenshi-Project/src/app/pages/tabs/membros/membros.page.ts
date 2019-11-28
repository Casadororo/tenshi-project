import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { CasasService } from 'src/app/services/casas.service';
import { Subscription } from 'rxjs';
import { Casas } from 'src/app/interfaces/casas';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage implements OnInit {
  private houseId: string = "";
  private uid: string = '';
  private membroSubscrition: Subscription;
  private casa: Casas = {};
  private ready = 'none';

  constructor(private dataService: DataService, private authService: AuthService, private casasService: CasasService, private alertCtrl: AlertController) {
    this.houseId = this.dataService.getHouseId();
  }

  async ngOnInit() {
    this.uid = await this.authService.getAuth().currentUser.uid;
    this.casasService.createHomeCollection();
    this.membroSubscrition = await this.casasService.getMembros(this.houseId).subscribe(data => {
      this.casa = data;
      if (!this.casa.membros) {
        this.casa.membros = [];
      }
      this.casa.homeId = this.houseId;
      //console.log(this.casa);
      this.ready = 'ready';
    });
  }

  deleteMembro(uid: string) {
    this.casasService.createHomeCollection();
    this.casa.membros.splice(this.casa.membros.indexOf(uid), 1);
    this.casasService.updateMembros(this.casa);
  }

  addMembro(uid: string) {
    this.casasService.createHomeCollection();
    this.casa.membros.push(uid);
    this.casasService.updateMembros(this.casa);
  }

  async addAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Adicione um novo Membro',
      mode: 'ios',
      message: 'Apenas insira seu <strong>codigo de usuario</strong> e click em <strong>Adicionar</strong>',
      inputs: [
        {
          name: 'uid',
          type: 'text',
          placeholder: 'Uid'
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
            this.addMembro(data.uid);
          }
        }
      ]
    });

    await alert.present();
  }
}
