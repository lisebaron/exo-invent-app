import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { selectUserDatas } from 'src/app/store/user.selectors';
import { Router } from '@angular/router';
import { create } from '../../store/user.actions';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  currentUserObservable$: Observable<User>;
  currentUser?: User;

  profileForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    genre: new FormControl(""),
    birthdate: new FormControl(""),
  });

  constructor(private store: Store, private aFirestore: AngularFirestore, private router: Router) {
    this.currentUserObservable$ = store.select(selectUserDatas);
  }

  ngOnInit(): void {
    this.currentUserObservable$.subscribe((data: User)=> {
      this.currentUser = data;
    });
    this.initFormValues();
  }

  initFormValues() {
    this.profileForm.controls.firstname.setValue(this.currentUser?.firstname);
    this.profileForm.controls.lastname.setValue(this.currentUser?.lastname);
    this.profileForm.controls.genre.setValue(this.currentUser?.genre);
    this.profileForm.controls.birthdate.setValue(this.currentUser?.birthdate);
  }

  async onSubmit() {
    await this.aFirestore.collection("users").doc(this.currentUser?.uid).update(this.profileForm.getRawValue());
    this.store.dispatch(create({...this.profileForm.getRawValue(), email: this.currentUser?.email}));
    this.router.navigate(['profile']);
  }
}
