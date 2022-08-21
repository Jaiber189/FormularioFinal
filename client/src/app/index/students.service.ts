import {Injectable} from '@angular/core';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StudentService {

  studentsData: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<any> {
    this.studentsData = this.httpClient.get(environment.serverUrl + 'students')
      .pipe(publishReplay(), refCount());
    // if (!this.studentsData) {
    // }
    return this.studentsData;
  }

  registerStudent(data) {
    return this.httpClient.post(environment.serverUrl + 'students',data)
  }

  find(id) {
    return this.httpClient.get(environment.serverUrl + 'students/' + id)
  }

  update(id, data) {
    return this.httpClient.put(environment.serverUrl + 'students/' + id, data)
  }

  delete(id) {
    return this.httpClient.delete(environment.serverUrl + 'students/' + id)
  }

  sendWelcomeEmail(to) {
    return this.httpClient.get(environment.serverUrl + 'mail?email=' + to)
  }
}
