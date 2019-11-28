import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { CasasService } from 'src/app/services/casas.service';
import { Casas } from 'src/app/interfaces/casas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private houseId: string = "";
  private mainHome: boolean = false;
  private mainHomeSubscription: Subscription;
  private casaSubscrition: Subscription;
  private user: User = {
    uid: ""
  };
  private loading: any;
  private casa: Casas = {};

  constructor(private dataService: DataService, private userService: UserService, private authService: AuthService, private alertCtrl: AlertController, private casasService: CasasService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private router:Router) {
    this.houseId = dataService.getHouseId();

  }

  async ngOnInit() {
    this.user.uid = await this.authService.getAuth().currentUser.uid;

    this.casasService.createHomeCollection();
    this.casaSubscrition = await this.casasService.getMembros(this.houseId).subscribe(data => {
      //console.log(data);
      this.casa = data;
      this.casa.homeId = this.houseId;
      //console.log(this.casa);
    });

    this.mainHomeSubscription = await this.userService.getMainHome(this.user.uid).subscribe(data => {
      if (data.mainHome) {
        if (data.mainHome == this.houseId) {
          this.mainHome = true;
        }
      }
      else {
        this.mainHome = false;
      }
    });
  }

  async infoMainHome() {
    const info = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Info: Casa Principal',
      message: 'Seleciona essa casa como <strong>Casa Principal</strong>:<br>Isso fara essa casa ser aberta automaticamente<br>Apenas uma casa pode ser Principal por vez',
      buttons: [
        {
          text: 'Obrigado',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ativar',
          handler: () => {
            this.toggleMainHome();
          }
        }
      ]
    });

    await info.present();
  }

  toggleMainHome() {
    this.user.mainHome = !this.mainHome ? this.houseId : "";

    this.userService.setMainHome(this.user);
  }

  async deleteAlert() {
    const info = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Deletar Casa',
      message: 'Essa operação não pode ser <strong>desfeita</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Deletar',
          handler: () => {
            this.deleteHome();
          }
        }
      ]
    });

    await info.present();
  }

  async deleteHome() {
    await this.presentLoading();

    try {
      this.casasService.createHomeCollection();
      await this.casasService.deleteHome(this.houseId);
      this.router.navigateByUrl('menu');
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
