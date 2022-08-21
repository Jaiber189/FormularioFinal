import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AlertModel } from '../basic-modal/basic-modal.component';
import { StudentService } from '../../../index/students.service';
import { StudentModel } from '../../../index/index.component';
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AlertModel {
  
  title: string = '';
  message: string = '';
  mode: string = null;
  id: number = null;

  nivel_academico: string = null;
  especialidad: string = null;
  studentForm: FormGroup;
  student: StudentModel = {
    id: null,
    nombre: '',
    correo: '',
    semestre: null,
    matricula: '',
    nivel_academico: '',
    especialidad: '',
  };

  niveles_academicos: string[] = [
    'Bachillerato',
    'Licenciatura',
    'Maestria',
    'Doctorado'
  ];
  allEspecialidades = {
    Bachillerato: [],
    Licenciatura: [
      'Enfermería',
      'Software',
      'Arquitectura'
    ],
    Maestria: [
      'Fiscal',
      'Educación'
    ],
    Doctorado: [
      'Comunicación',
      'Gastronomía'
    ]
  }
  especialidades = []
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private studentService: StudentService,
    private dialog: MatDialogRef<RegisterComponent>
  ) {
    this.mode = data.mode
    this.id = data.id
    this.initForm()
  }

  confirm() {
    // this.close();
  }

  close(){
    this.dialog.close({ok: false})
  }

  async initForm() {
    this.studentForm = new FormGroup({
      'nombre': new FormControl(this.student.nombre, [Validators.required]),
      'correo': new FormControl('', [Validators.email]),
      'semestre': new FormControl(1, [Validators.required]),
      'matricula': new FormControl(null, [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      'nivel_academico': new FormControl(this.niveles_academicos[0], [Validators.required]),
      'especialidad': new FormControl(null)
    });
    if(this.mode == 'EDIT') {
      await this.getStudent()
      this.studentForm.get('nombre').setValue(this.student.nombre)
      this.studentForm.get('correo').setValue(this.student.correo)
      this.studentForm.get('semestre').setValue(this.student.semestre)
      this.studentForm.get('matricula').setValue(this.student.matricula)
      this.studentForm.get('nivel_academico').setValue(this.student.nivel_academico)
      this.onLevelChange()
    }
  }

  onRegisterStudent() {
    if(this.mode == 'EDIT') {
      this.studentService.update(this.id, this.studentForm.value).subscribe(resp => {
        this.dialog.close({ok: true})
      }, error => {
        this.failed(error)
      })
    }else {
      this.studentService.registerStudent(this.studentForm.value).subscribe(resp => {
        this.studentService.sendWelcomeEmail(this.studentForm.get('correo').value).subscribe(res => {
          this.dialog.close({ok: true})
        }, error => {
          this.failed(error)
        })
        this.dialog.close({ok: true})
      }, error => {
        this.failed(error)
      })

    }
  }

  onLevelChange(){
    console.log(this.studentForm)
    this.especialidades = this.allEspecialidades[this.studentForm.get('nivel_academico').value]
    this.studentForm.get('especialidad').setValue(this.especialidades[0] ? this.especialidades[0] : null)
  }

  async getStudent(){
    return new Promise(resolve => {
      this.studentService.find(this.id).subscribe(student => {
        this.student = student
        resolve(true)
      });
    })
  }

  failed(error) {
    let messages = []
    if(error.error.message){
      messages.push({message: error.error.message})
    }else{
      messages = error.error._embedded.errors
    }
    this.dialog.close({
      ok: false,
      message: messages
    })
  }

}