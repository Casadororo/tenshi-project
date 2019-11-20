import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private houseId: string = "";

  constructor(private dataService: DataService) {
    this.houseId = dataService.getHouseId();
  }

  ngOnInit() {
  }

}
