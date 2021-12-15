import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {
  userList?: Array<User> = [
    {firstname: "Henri", lastname: "Bonjour", uid: "1", email: "bonjour@gmail.com", birthdate: "09/05/2001", genre: 1, password: ""},
    {firstname: "John", lastname: "Nhoj", uid: "1", email: "nhoj@gmail.com", birthdate: "08/01/1999", genre: 2, password: ""},
    {firstname: "Pierre", lastname: "Feuille", uid: "1", email: "ciseaux@gmail.com", birthdate: "07/01/2002", genre: 2, password: ""},
    {firstname: "Jean", lastname: "Bonjour", uid: "1", email: "bonjour@gmail.com", birthdate: "06/01/2012", genre: 1, password: ""},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
