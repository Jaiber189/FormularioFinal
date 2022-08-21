package students.registration.form


import grails.rest.*
import grails.converters.*

class MailController {
	// static responseFormats = ['json', 'xml']
  
  def index() { 
    def email = params["email"]
    sendMail {
      to "${email}"
      from "school@gmail.com"
      cc "marge@gmail.com", "ed@gmail.com"
      bcc "joe@gmail.com"
      subject "Hello"
      text 'Hola, Bienvenido!'
    }
    respond ( [ok: true] )
  }
}
