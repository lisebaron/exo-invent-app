import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from 'src/app/interfaces/participant';

@Component({
  selector: 'app-edit-participant-dialog',
  templateUrl: './edit-participant-dialog.component.html',
  styleUrls: ['./edit-participant-dialog.component.scss']
})
export class EditParticipantDialogComponent implements OnInit {
  participantForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    birthdate: new FormControl("", Validators.required),
    genre: new FormControl("", Validators.required),
  });

  isDisabled = true;
  
  constructor(public dialogRef: MatDialogRef<EditParticipantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participant) {}

  ngOnInit(): void {
    this.initFormValues();
  }

  /* 
  * Initiates form values.
  */
  initFormValues() {
    this.participantForm.patchValue({
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      email: this.data.email,
      birthdate: this.data.birthdate,
      genre: this.data.genre,
    });
  }

  /* 
  * Checks if a given control has errors.
  */
  hasErrors(nameControl: string) {
    let currentControl = this.participantForm.get(nameControl);
    if (currentControl?.hasError("email")) {
      return "The email is badly formatted.";
    } else if (currentControl?.hasError("required")) {
      return "You must enter a value";
    }
    this.checkButton();
    return "";
  }

  /* 
  * Checks if the form is valid.
  */
  checkButton() {
    if (this.participantForm.valid) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  /* 
  * Closes the dialog when canceled.
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* 
  * Closes the dialog and sends datas from participantForm.
  */
  onConfirm() {
    this.dialogRef.close({...this.participantForm.getRawValue(), uid: this.data.uid});
  }

}
