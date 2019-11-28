import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/modals/profile/profile.page';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router:Router, private authService: AuthService, private userService:UserService) { 
  }

  async ngOnInit() {
  }

  async openProfile(){
    const profileModal = await this.modalCtrl.create({
      component: ProfilePage
    });
    profileModal.present();
  }
}
