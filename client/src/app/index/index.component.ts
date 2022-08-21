import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav/nav.service';
import {Route, Router} from '@angular/router';

import { environment } from '../../environments/environment';
import { StudentService } from './students.service';
import { BasicModalComponent } from '../components/modals/basic-modal/basic-modal.component';
import { RegisterComponent } from '../components/modals/register/register.component';
import { MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../components/modals/error-modal/error-modal.component';

export interface StudentModel {
  id?: number;
  nombre?: String;
  correo?: String;
  semestre?: number;
  matricula?: String;
  nivel_academico?: String;
  especialidad?: String;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [StudentService]
})
export class IndexComponent implements OnInit {

  students: Array<any>;
  serverUrl: string;
  showForm:boolean = false

  constructor(
    private navService: NavService,
    private studentService: StudentService,
    private dialogRef : MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.serverUrl = environment.serverUrl;
    this.getStudents()
  }
  
  getStudents () {
    this.studentService.getStudents().subscribe(students => {
      this.students = students.sort((a: any, b: any) => {
        if (a.nombre < b.nombre) {
          return -1;
        } else if (a.nombre > b.nombre) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  onDelete (id) {
    this.dialogRef.open(BasicModalComponent,{
      data : {}
    }).afterClosed()
    .subscribe(ok => {
      if(ok) {
        this.studentService.delete(id).subscribe(resp => {
          this.getStudents()
        })
      }
    });
  }

  onEdit (id) {
    this.dialogRef.open(RegisterComponent,{
      data : {
        mode: 'EDIT',
        id: id
      }
    }).afterClosed()
    .subscribe(ok => {
      if(ok) {
        this.getStudents()
      }
    });
  }
  
  openForm() {
    this.dialogRef.open(RegisterComponent,{
      data : {}
    }).afterClosed()
    .subscribe(result => {
      if(result.ok) {
        this.getStudents()
        this.openInfoModal()
      }else{
        if(result.message){
          this.openErrorModal(result.message)
        }
      }
    });
  }

  openErrorModal(errors) {
    this.dialogRef.open(ErrorModalComponent,{
      data : {
        messages: errors
      }
    }).afterClosed()
    .subscribe(ok => {
      if(ok) {
        
      }
    });
  }

  openInfoModal () {
    this.dialogRef.open(BasicModalComponent,{
      data : {
        message: 'Estudiante registrado con éxito!',
        showCancel: false
      }
    }).afterClosed()
    .subscribe(ok => {
      // Nice
    });
  }
}
