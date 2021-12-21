import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-participant-dialog',
  templateUrl: './create-participant-dialog.component.html',
  styleUrls: ['./create-participant-dialog.component.scss']
})
export class CreateParticipantDialogComponent implements OnInit {
  participantForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    birthdate: new FormControl("", Validators.required),
    genre: new FormControl("", Validators.required),
    showEmail: new FormControl(false, Validators.required),
    showBirthdate: new FormControl(false, Validators.required),
    showCard: new FormControl(false, Validators.required),
  });
  
  isDisabled = true;

  constructor(public dialogRef: MatDialogRef<CreateParticipantDialogComponent>) { }

  ngOnInit(): void {
  }

  /* 
  * Checks if a given control has errors.
  */
  hasErrors(nameControl: string) {
    let currentControl = this.participantForm.get(nameControl);
    if (currentControl?.hasError("email")) {
      return "The email is badly formatted.";
    } else if (currentControl?.hasError("required")) {
      return "You must enter a value.";
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
  * Closes the dialog and sends participantForm values.
  */
  onConfirm() {
    this.dialogRef.close(this.participantForm.getRawValue());
  }

}
