import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { selectUserDatas } from 'src/app/store/user.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUserObservable$: Observable<User>;
  currentUser?: User;

  constructor(private store: Store, private router: Router) {
    this.currentUserObservable$ = store.select(selectUserDatas);
   }

  ngOnInit(): void {
    this.currentUserObservable$.subscribe((data: User)=> {
      this.currentUser = data;
    });
  }

  /* 
  * Navigates to edit profile.
  */
  goToEdit() {
    this.router.navigate(["app/profile-edit"]);
  }

}
