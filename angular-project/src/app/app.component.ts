import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';
  opened = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  logOut() {
    this.authService.signOut();
    this.opened = false;
    this.router.navigate(["login"]);
  }

  isAuth() {
    return this.authService.isAuth;
  }
}
