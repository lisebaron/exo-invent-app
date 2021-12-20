import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { create} from '../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;

  constructor(private aFireAuth: AngularFireAuth,
              private aFirestore: AngularFirestore,
              private store: Store,
              private router: Router) {
    this.checkAuth();
  }

  /* 
  * Checks if a user is authenticated.
  */
  checkAuth() {
    const test = this.aFireAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.aFirestore.collection("users").doc(res.uid).get().subscribe((data: any) => {
          this.store.dispatch(create({user: data.data()}));
        });
        this.isAuth = true;
      } else if (!res) {
        test.unsubscribe();
        this.isAuth = false;
      }
    });
  }

  /* 
  * Returns authState.
  */
  authenticated() {
    return this.aFireAuth.authState;
  }
  
  /* 
  * Sign up
  */
  async register(user: User) {
    try {
      const registerUser = await this.aFireAuth.createUserWithEmailAndPassword(user.email, user.password);
      await this.aFirestore.collection("users").doc(registerUser.user?.uid).set({
          uid: registerUser.user?.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          birthdate: user.birthdate,
          genre: user.genre,
          email: user.email,
        });
    } catch (error) {
      console.error();
    }
  }

  /* 
  * Sign in
  */
  async login(user: User) {
    try {
      (await this.aFireAuth.signInWithEmailAndPassword(user.email, user.password))?.user?.uid;
      this.router.navigate([""]);
    } catch (error) {
      console.error();
    }
  }

  /* 
  * Sign out
  */
  signOut() {
    this.aFireAuth.signOut();
  }
}
