import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  constructor(private http: HttpClient,
    private authService: AuthService) { }

  get(): Observable<any> {
    const { userId } = this.authService.currentUserValue;
    return this.http.get(`${ServiceUrl.NoteUrl}/notes/${userId}`);
  }

  save(note: Note): Observable<any> {
    const { userId } = this.authService.currentUserValue;
    if (note.id) {
      return this.http.put(`${ServiceUrl.NoteUrl}/notes/${userId}/${note.id}`, note);
    }
    note.createdBy = userId;
    return this.http.post(`${ServiceUrl.NoteUrl}/notes/${userId}`, note);
  }

  delete(noteId: number): Observable<any> {
    const { userId } = this.authService.currentUserValue;
    return this.http.delete(`${ServiceUrl.NoteUrl}/notes/${userId}/${noteId}`);
  }
}
