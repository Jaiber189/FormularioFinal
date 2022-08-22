package students.registration.form
import grails.rest.*

@Resource(uri='/students', formats=['json', 'xml'])
class Student {
    String nombre
    String correo
    Integer semestre
    String matricula
    String nivel_academico
    String especialidad

    static constraints = {
        nombre(nullable:false,blank:false)
        correo(nullable:false,blank:false,email:true)
        semestre(nullable:false,blank:false, min: 1, max: 1)
        matricula(nullable:false,blank:false,unique: true)
        nivel_academico inList: ['Bachillerato', 'Licenciatura', 'Maestria', 'Doctorado']
        especialidad(nullable:true,blank:false)
    }

    static mapping = {
        table 'students'
        nombre column: 'nombre'
        correo column: 'correo'
        semestre column: 'semestre'
        matricula column: 'matricula'
        nivel_academico column: 'nivel_academico'
        especialidad column: 'especialidad'
    }
}
