import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router) {
  }

  /* 
  * Allows access when a user is auth.
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      
    return this.authService.authenticated().pipe(switchMap((auth) => {
      if (auth) {
        return of(true);
      } else {
        this.router.navigate(["login"]);
        return of(false);
      }
    }));
  }
  
}
