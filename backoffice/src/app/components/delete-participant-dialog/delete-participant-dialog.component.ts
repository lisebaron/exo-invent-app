import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-participant-dialog',
  templateUrl: './delete-participant-dialog.component.html',
  styleUrls: ['./delete-participant-dialog.component.scss']
})
export class DeleteParticipantDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteParticipantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void { }

  /* 
  * Closes the dialog when canceled.
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* 
  * Closes the dialog and returns true.
  */
  onConfirm() {
    this.dialogRef.close(true);
  }
}
