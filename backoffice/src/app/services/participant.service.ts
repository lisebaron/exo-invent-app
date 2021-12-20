import { Injectable } from '@angular/core';
import { Participant } from '../interfaces/participant';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private aFirestore: AngularFirestore) { }

  /* 
  * Creates a participant.
  */
  async create(participant: Participant) {
    try {
      participant.uid = this.aFirestore.createId();
      await this.aFirestore.collection("participants").doc(participant.uid).set(participant);
    } catch (error) {
      console.error();
    }
  }

  /* 
  * Updates a participant.
  */
  async update(participant: Participant) {
    try {
      await this.aFirestore.collection("participants").doc(participant.uid).update(participant);
    } catch (error) {
      console.error();
    }
  }

  /* 
  * Deletes a participant.
  */
  async delete(uid: string) {
    try {
      await this.aFirestore.collection("participants").doc(uid).delete();
    } catch (error) {
      console.error();
    }
  }

  /* 
  * Gets all participants in the collection.
  */
  getAll() {
    return this.aFirestore.collection("participants").valueChanges();
  }
}
