package students.registration.form

import grails.gorm.services.Service

@Service(Notification)
interface NotificationService {

    Notification get(Serializable id)

    List<Notification> list(Map args)

    Long count()

    Notification delete(Serializable id)

    Notification save(Notification notification)

}
