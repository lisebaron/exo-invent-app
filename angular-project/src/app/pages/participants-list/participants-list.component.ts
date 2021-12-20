import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/interfaces/participant';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {
  participantList: Array<Participant> = [];
  
  constructor( private pService: ParticipantService) { }

  ngOnInit(): void {
    this.getAllParticipants();
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

      this.sortParticipantsByLastname();
    });
  }

  /* 
  * Sorts Participants by their lastname.
  */
  sortParticipantsByLastname() {
    this.participantList.sort(function(a, b) {
      if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) { return -1; }
      if(a.lastname.toLowerCase() > b.lastname.toLowerCase()) { return 1; }
      return 0;
    });
  }

  /* 
  * Sorts Participants by their firstname.
  */
  sortParticipantsByFirstname() {
    this.participantList.sort(function(a, b) {
      if(a.firstname.toLowerCase() < b.firstname.toLowerCase()) { return -1; }
      if(a.firstname.toLowerCase() > b.firstname.toLowerCase()) { return 1; }
      return 0;
    });
  }

}
