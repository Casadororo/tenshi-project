import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/modals/profile/profile.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openProfile(){
    const profileModal = await this.modalCtrl.create({
      component: ProfilePage
    });
    profileModal.present();
  }
}
