import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afa:AngularFirestore) { 
    this.usersCollection = this.afa.collection<User>('users');
  }

  createCollection(){
    this.usersCollection = this.afa.collection<User>('users');
  }

  setMainHome(user:User){
    return this.usersCollection.doc<User>(user.uid).update({
      mainHome: user.mainHome
    });
  }

  getMainHome(uid:string){
    return this.usersCollection.doc<User>(uid).valueChanges();
  }
}
