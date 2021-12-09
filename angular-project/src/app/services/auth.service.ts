import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { create} from '../store/user.actions';
import { selectUserDatas } from 'src/app/store/user.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserObservable$: Observable<User> | undefined;
  isAuth = false;

  constructor(private aFireAuth: AngularFireAuth,
              private aFirestore: AngularFirestore,
              private store: Store,
              private router: Router) {
    this.currentUserObservable$ = store.select(selectUserDatas);
    this.checkAuth();
  }

  checkAuth() {
    this.aFireAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.aFirestore.collection("users").doc(res.uid).get().subscribe((data: any) => {
          this.store.dispatch(create(data.data()));
        });
        this.isAuth = true;
        this.router.navigate(['']);
      } else if (res == null) {
        this.isAuth = false;
      }
    });
  }

  authenticated() {
    return this.aFireAuth.authState;
  }
  
  async register(user: User) {
    try {
      const registerUser = await this.aFireAuth.createUserWithEmailAndPassword(user.email, user.password);
      const createUser = this.aFirestore.collection("users").doc(registerUser.user?.uid).set({
          uid: registerUser.user?.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          birthdate: user.birthdate,
          genre: user.genre,
          email: user.email,
        });
      console.log("success ", createUser);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async login(user: User) {
    try {
      const userId = (await this.aFireAuth.signInWithEmailAndPassword(user.email, user.password))?.user?.uid;
    } catch (error) {
      console.log("error");
    }
  }

  signOut() {
    this.aFireAuth.signOut();
  }
}
