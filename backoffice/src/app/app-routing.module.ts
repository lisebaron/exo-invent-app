import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantsListComponent } from './pages/participants-list/participants-list.component';

const routes: Routes = [
  { path: "participants", component: ParticipantsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
