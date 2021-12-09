import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authService.isAuth) {
      this.router.navigate(['login']);
    }
    return this.authService.authenticated().pipe(switchMap((auth) => {
      if (auth) {
        return of(true);
      } else {
        return of(false);
      }
    }));
  }
  
}
