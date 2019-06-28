import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder } from './reminder';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService extends BaseService {

  constructor(private http: HttpClient, authService: AuthService) {
    super(authService);
  }

  get(): Observable<Reminder[]> {
    return this.http.get(`${ServiceUrl.ReminderUrl}/reminders/${this.userId}`)
      .pipe(map((rem: Reminder[]) => rem));
  }

  save(reminder: Reminder): Observable<never> {
    if (reminder.id) {
      return this.http.put(`${ServiceUrl.ReminderUrl}/reminder/${reminder.id}`, reminder)
        .pipe(map((never: never) => never));
    }
    reminder.createdBy = this.userId;
    return this.http.post(`${ServiceUrl.ReminderUrl}/reminder`, reminder)
      .pipe(map((never: never) => never));
  }

  delete(reminderId: number): Observable<never> {
    return this.http.delete(`${ServiceUrl.ReminderUrl}/reminder/${reminderId}`)
      .pipe(map((never: never) => never));
  }
}
