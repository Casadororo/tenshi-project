import { Injectable } from '@angular/core';
import { Switch } from '../interfaces/switch';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private productsCollection: AngularFirestoreCollection<Switch>;

  constructor(private afs: AngularFirestore) {
  }

  createCollection(houseId:String){
    this.productsCollection = this.afs.collection<Switch>('homes/'+houseId+'/Configs');
  }

  getSwitch(id: string) {
    return this.productsCollection.doc<Switch>(id).valueChanges();
  }

  addSwitch(switchData: Switch) {
    return this.productsCollection.add({
      name: switchData.name,
      nodeId: switchData.nodeId,
      port: switchData.port
    });
  }

  updateSwitch(switchData: Switch) {
    return this.productsCollection.doc<Switch>(switchData.id).update({
      name: switchData.name,
      nodeId: switchData.nodeId,
      port: switchData.port
    });
  }

  deleteSwitch(switchData: Switch){
    return this.productsCollection.doc(switchData.id).delete();
  }

}
