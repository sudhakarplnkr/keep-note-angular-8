import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder } from './reminder';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { AuthService } from '../services/auth.service';
import { Category } from '../categories/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  get(): Observable<Reminder[]> {
    const { userId } = this.authService.currentUserValue;
    return this.http.get(`${ServiceUrl.ReminderUrl}/reminders/${userId}`).pipe(map((rem: Reminder[]) => rem));
  }

  save(reminder: Reminder): Observable<any> {
    if (reminder.id) {
      return this.http.put(`${ServiceUrl.ReminderUrl}/reminder/${reminder.id}`, reminder);
    }
    const { userId } = this.authService.currentUserValue;
    reminder.createdBy = userId;
    return this.http.post(`${ServiceUrl.ReminderUrl}/reminder`, reminder);
  }

  delete(reminderId: number): Observable<any> {
    return this.http.delete(`${ServiceUrl.ReminderUrl}/reminder/${reminderId}`);
  }
}
