import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage implements OnInit {
  private houseId: string = "";

  constructor(private dataService: DataService) {
    this.houseId = dataService.getHouseId();
  }
  
  ngOnInit() {
  }

}
