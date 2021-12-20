import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { selectUserDatas } from 'src/app/store/user.selectors';
import { Router } from '@angular/router';
import { create } from '../../store/user.actions';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private store: Store,
    private router: Router,
    private userService: UserService) {
    this.currentUserObservable$ = store.select(selectUserDatas);
  }

  ngOnInit(): void {
    this.currentUserObservable$.subscribe((data: User) => {
      if (data) {
        this.currentUser = data;
        this.initFormValues();
      }
    });
  }

  /* 
  * Initiate form Values.
  */
  initFormValues() {
    this.profileForm.patchValue({
      firstname: this.currentUser?.firstname,
      lastname: this.currentUser?.lastname,
      genre: this.currentUser?.genre,
      birthdate: this.currentUser?.birthdate,
    });
  }

  /* 
  * Submit updated data.
  */
  onSubmit() {
    try {
      this.userService.update({...this.profileForm.getRawValue(), email: this.currentUser?.email, uid: this.currentUser?.uid});
      this.store.dispatch(create({user: {...this.profileForm.getRawValue(), email: this.currentUser?.email, uid: this.currentUser?.uid}}));
      this.router.navigate(["app/profile"]);
    } catch (error) {
      console.error();
    }
  }
}
