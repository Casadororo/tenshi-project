import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cad',
  templateUrl: './cad.page.html',
  styleUrls: ['./cad.page.scss'],
})
export class CadPage implements OnInit {
  user: User = {
    email: "",
    password: ""
  }
  passwordAgain: string = "";
  private loading: any;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private authSetvice: AuthService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async cad() {
    try {
      await this.presentLoading();
      if (this.user.email.length >= 8 && this.user.password == this.passwordAgain && this.user.password.length >= 6) {
        await this.authSetvice.register(this.user).then(() => {
          this.closeModal();
        }
        );
      }
      else {
        this.presentToast("Informações incorretas");
      }
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
