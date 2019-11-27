import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private uid:string = "";

  constructor(private modalCtrl:ModalController, private authService:AuthService) { }

  async ngOnInit() {
    this.uid = await this.authService.getAuth().currentUser.uid;    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  deslogar(){
    this.authService.logout();
    this.modalCtrl.dismiss();
  }
}
