import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { StoreModule } from '@ngrx/store';
import * as ParticipantReducer from './store/participant.reducers';

import { ReactiveFormsModule } from '@angular/forms';

import { ParticipantsListComponent } from './pages/participants-list/participants-list.component';
import { CreateParticipantDialogComponent } from './components/create-participant-dialog/create-participant-dialog.component';
import { DeleteParticipantDialogComponent } from './components/delete-participant-dialog/delete-participant-dialog.component';
import { EditParticipantDialogComponent } from './components/edit-participant-dialog/edit-participant-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantsListComponent,
    CreateParticipantDialogComponent,
    DeleteParticipantDialogComponent,
    EditParticipantDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    StoreModule.forRoot({participantState: ParticipantReducer.createParticipantReducer}),
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
