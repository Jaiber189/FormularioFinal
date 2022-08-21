import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title?: string;
  message?: string;
  mode?: string;
  id?: number;
}

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.css']
})
export class BasicModalComponent {
  title: string = '';
  message: string = '¿Desea eliminar este registro?';
  showCancel = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialogRef<BasicModalComponent>
    ) {
      this.dialog.addPanelClass('custom-modal')
      if(data.message){
        this.message = data.message
      } 
      if(data.showCancel !== undefined){
        this.showCancel = data.showCancel
      }
  }

  confirm() {
    this.dialog.close(true)
  }

  close(){
    this.dialog.close(false)
  }

}