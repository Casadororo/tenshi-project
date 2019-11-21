import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {};
  loading: any;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private authSetvice: AuthService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async login() {
    try {
      await this.presentLoading();

      await this.authSetvice.login(this.user).then(() => {
        this.closeModal();
      }
      );
    }
    catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3500 });
    toast.present();
  }
}
