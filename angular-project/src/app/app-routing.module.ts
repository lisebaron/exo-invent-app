import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ParticipantsListComponent } from './pages/participants-list/participants-list.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo:"app/home", pathMatch:"full"},
  { path: "app", children: [
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
    { path: "profile-edit", component: ProfileEditComponent, canActivate: [AuthGuard] },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
    { path: "participants", component: ParticipantsListComponent, canActivate: [AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
