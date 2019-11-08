import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Casas } from '../interfaces/casas';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CasasService {
  private casasCollection: AngularFirestoreCollection<Casas>;

  constructor(private afs: AngularFirestore) { }
  
  createCollection(id:String){
      this.casasCollection = this.afs.collection<Casas>('homes/');
  }
  
  getCasas() {
    return this.casasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const homeId = a.payload.doc.id;
          
          return { homeId, ...data };
        });
      })
      );
    }

}