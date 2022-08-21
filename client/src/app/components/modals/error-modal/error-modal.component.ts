import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  title: string = '';
  errors = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialogRef<ErrorModalComponent>
    ) {
      this.dialog.addPanelClass('custom-modal')
      this.errors = data.messages
  }

  confirm() {
    this.dialog.close(true)
  }

  close(){
    this.dialog.close(false)
  }

}
