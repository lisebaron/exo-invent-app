import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private aFirestore: AngularFirestore) { }

  /* 
  * Returns all participants in the collection.
  */
  getAll() {
    return this.aFirestore.collection("participants").valueChanges();
  }
}
