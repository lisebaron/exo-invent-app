import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { CanActivateRouteGuard } from './guard/can-activate-route.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [CanActivateRouteGuard] },
  {path: 'profile-edit', component: ProfileEditComponent, canActivate: [CanActivateRouteGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
