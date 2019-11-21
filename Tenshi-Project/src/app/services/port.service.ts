import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PortService {
  portsCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
  }

  updateStats(nodeId: string, port: string, stats: string) {
    this.portsCollection = this.afs.collection('nodes/' + nodeId + '/ports');


    (stats == "true" ? stats = "false" : stats = "true");
    return this.portsCollection.doc(port).set({
      stats: stats
    })
  }
}
