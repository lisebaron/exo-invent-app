import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/interfaces/participant';
import { MatDialog } from '@angular/material/dialog';
import { CreateParticipantDialogComponent } from 'src/app/components/create-participant-dialog/create-participant-dialog.component';
import { DeleteParticipantDialogComponent } from 'src/app/components/delete-participant-dialog/delete-participant-dialog.component';
import { EditParticipantDialogComponent } from 'src/app/components/edit-participant-dialog/edit-participant-dialog.component';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {
  participantList: Array<Participant> = [];
  
  constructor(public dialog: MatDialog, private pService: ParticipantService) { 
  }

  ngOnInit(): void {
    this.getAllParticipants();
  }

  /* 
  * Opens dialog to create a participant.
  */
  openCreateParticipantDialog() {
    const dialogRef = this.dialog.open(CreateParticipantDialogComponent, {
      width: "350px",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pService.create(result);
      }
    });
  }
  
  /* 
  * Opens dialog to edit a given participant.
  */
  openEditParticipantDialog(participant: Participant) {
    const dialogRef = this.dialog.open(EditParticipantDialogComponent, {
      width: "350px",
      data: participant,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pService.update(result);
      }
    });
  }

  /* 
  * Opens dialog to delete a given participant.
  */
  openDeleteParticipantDialog(participant: Participant) {
    const dialogRef = this.dialog.open(DeleteParticipantDialogComponent, {
      width: "350px",
      data: (participant.firstname + " " + participant.lastname),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pService.delete(participant.uid);
      }
    });
  }

  /* 
  * Gets all participants in the collection.
  */
  getAllParticipants() {
    this.pService.getAll().subscribe((data) => {
      this.participantList = [] as Array<Participant>;
      data.forEach(doc => {
        this.participantList.push(doc as Participant);
      });
    });
  }
}
