import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private houseId: string;

  constructor() { }

  setHouseId(houseId:string) {
    this.houseId = houseId;
  }

  getHouseId() {
    return this.houseId;
  }


}
