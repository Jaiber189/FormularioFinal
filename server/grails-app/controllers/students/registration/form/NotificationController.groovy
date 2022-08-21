package students.registration.form

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class NotificationController {

    NotificationService notificationService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond notificationService.list(params), model:[notificationCount: notificationService.count()]
    }

    def show(Long id) {
        respond notificationService.get(id)
    }

    @Transactional
    def save(Notification notification) {
        if (notification == null) {
            render status: NOT_FOUND
            return
        }
        if (notification.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond notification.errors
            return
        }

        try {
            notificationService.save(notification)
        } catch (ValidationException e) {
            respond notification.errors
            return
        }

        respond notification, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Notification notification) {
        if (notification == null) {
            render status: NOT_FOUND
            return
        }
        if (notification.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond notification.errors
            return
        }

        try {
            notificationService.save(notification)
        } catch (ValidationException e) {
            respond notification.errors
            return
        }

        respond notification, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || notificationService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
