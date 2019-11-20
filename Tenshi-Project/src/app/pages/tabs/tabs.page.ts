import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ProfilePage } from 'src/app/modals/profile/profile.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private dataServ:DataService, private activatedRoute:ActivatedRoute, private modalCtrl: ModalController) { 
    this.dataServ.setHouseId(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
  }

  async openProfile(){
    const profileModal = await this.modalCtrl.create({
      component: ProfilePage
    });
    profileModal.present();
  }
}
