import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import { Switch } from 'src/app/interfaces/switch';
import { SwitchService } from 'src/app/services/switch.service';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-switch-config',
  templateUrl: './switch-config.page.html',
  styleUrls: ['./switch-config.page.scss'],
})
export class SwitchConfigPage implements OnInit {
  private switch: Switch = {};
  private houseId: string = "";
  private loading: any;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private switchService: SwitchService, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.houseId = navParams.get('houseId');
    if (navParams.get('switch')) {
      this.switch = navParams.get('switch');
    }
    //console.log(this.switch);
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async deleteSwitch() {
    
    this.switchService.createCollection(this.houseId);
    await this.presentLoading();
    try {
      await this.switchService.deleteSwitch(this.switch);
      await this.loading.dismiss();
      this.closeModal();
    } catch (error) {
      this.presentToast('Erro ao tentar salvar' + error);
      this.loading.dismiss();
    }
  }

  async saveSwitch() {
    await this.presentLoading();

    this.switchService.createCollection(this.houseId);

    if (this.switch.id) {
      try {
      await this.switchService.updateSwitch(this.switch);
      await this.loading.dismiss();
      this.closeModal();
    } catch (error) {
      this.presentToast('Erro ao tentar salvar');
      this.loading.dismiss();
    }

    }
    else {
      try {
      await this.switchService.addSwitch(this.switch);
      await this.loading.dismiss();
      this.closeModal();
    } catch (error) {
      this.presentToast('Erro ao tentar salvar');
      this.loading.dismiss();
    }
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
