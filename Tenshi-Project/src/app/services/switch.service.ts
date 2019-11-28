import { Injectable } from '@angular/core';
import { Switch } from '../interfaces/switch';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private switchCollection: AngularFirestoreCollection<Switch>;

  constructor(private afs: AngularFirestore) {
  }

  createCollection(houseId:String){
    this.switchCollection = this.afs.collection<Switch>('homes/'+houseId+'/Configs');
  }

  getSwitch(id: string) {
    return this.switchCollection.doc<Switch>(id).valueChanges();
  }

  addSwitch(switchData: Switch) {
    return this.switchCollection.add({
      name: switchData.name,
      nodeId: switchData.nodeId,
      port: switchData.port
    });
  }

  updateSwitch(switchData: Switch) {
    return this.switchCollection.doc<Switch>(switchData.id).update({
      name: switchData.name,
      nodeId: switchData.nodeId,
      port: switchData.port
    });
  }

  deleteSwitch(switchData: Switch){
    return this.switchCollection.doc(switchData.id).delete();
  }

}
