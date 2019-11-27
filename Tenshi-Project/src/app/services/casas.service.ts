import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Casas } from '../interfaces/casas';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CasasService {
  private casasCollection: AngularFirestoreCollection<Casas>;
  private casasMembrosCollection: AngularFirestoreCollection<Casas>;

  constructor(private afs: AngularFirestore) { }

  createCollection(uid: string) {
    this.casasCollection = this.afs.collection<Casas>("homes", ref => ref.where('owner', '==', uid));
  }

  createMembrosCollection(uid: string) {
    this.casasMembrosCollection = this.afs.collection<Casas>("homes",ref => ref.where("membros", "array-contains", uid));
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

  getCasasMembros() {
    return this.casasMembrosCollection.snapshotChanges().pipe(
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