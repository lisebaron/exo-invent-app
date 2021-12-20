import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private aFirestore: AngularFirestore) { }

  /* 
  * Updates the given user.
  */
  async update(user: User) {
    try {
      await this.aFirestore.collection("users").doc(user.uid).update(user);
    } catch (error) {
      console.error();
    }
  }
}
