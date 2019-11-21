import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from 'src/app/modals/login/login.page';
import { CadPage } from 'src/app/modals/cad/cad.page';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async loginModal(){
    const loginModal = await this.modalCtrl.create({
      component: LoginPage
    });
    loginModal.present();
  }

  async cadModal(){
    const cadModal = await this.modalCtrl.create({
      component: CadPage
    });
    cadModal.present();
  }
}
