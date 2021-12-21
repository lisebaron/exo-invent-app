import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/interfaces/participant';
import { AuthService } from 'src/app/services/auth.service';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  participantList: Array<Participant> = [];

  constructor(private authService: AuthService, private pService: ParticipantService) { }

  ngOnInit(): void {
    this.authService.checkAuth();
    this.getAllParticipantsWithShowCard();
  }

  /* 
  * Gets all participants in the collection
  * with the field ShowCard on true.
  */
  getAllParticipantsWithShowCard() {
    this.pService.getAll().subscribe((data) => {
      this.participantList = [] as Array<Participant>;
      data.forEach((doc) => {
        let tmp = doc as Participant;
        if (tmp.showCard) {
          this.participantList.push(doc as Participant);
        }
      });
    });
  }

}
