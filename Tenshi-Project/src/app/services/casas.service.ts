import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Casas } from '../interfaces/casas';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class CasasService {
  private casasCollection: AngularFirestoreCollection<Casas>;
  private casasMembrosCollection: AngularFirestoreCollection<Casas>;

  constructor(private afs: AngularFirestore) { }
  
  //Colection Home
  createHomeCollection() {
    this.casasCollection = this.afs.collection<Casas>("homes");
  }

  addHome(casa:Casas){
    return this.casasCollection.add(casa);
  }
 
  deleteHome(homeId:string){
    return this.casasCollection.doc(homeId).delete();
  }

  //Casas Owner - Menu
  createCollection(uid: string) {
    this.casasCollection = this.afs.collection<Casas>("homes", ref => ref.where('owner', '==', uid));
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

  //Casas Membros - Menu
  createCasasMembrosCollection(uid: string) {
    this.casasMembrosCollection = this.afs.collection<Casas>("homes",ref => ref.where("membros", "array-contains", uid));
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

  // Membros Casas - Tab
  getMembros(houseId: string){
    return this.casasCollection.doc(houseId).valueChanges();
  }

  updateMembros(casa:Casas){
    //console.log(casa);
    return this.casasCollection.doc<Casas>(casa.homeId).update({
      membros: casa.membros
    });
  }
}