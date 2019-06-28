import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})

export class NoteService extends BaseService {
  constructor(private http: HttpClient,
    authService: AuthService) {
    super(authService);
  }

  get(): Observable<Note[]> {
    return this.http.get(`${ServiceUrl.NoteUrl}/notes/${this.userId}`)
      .pipe(map((notes: Note[]) => notes));
  }

  save(note: Note): Observable<never> {
    if (note.id) {
      return this.http.put(`${ServiceUrl.NoteUrl}/notes/${this.userId}/${note.id}`, note)
        .pipe(map((never: never) => never));
    }
    note.createdBy = this.userId;
    return this.http.post(`${ServiceUrl.NoteUrl}/notes/${this.userId}`, note)
      .pipe(map((never: never) => never));
  }

  delete(noteId: number): Observable<never> {
    return this.http.delete(`${ServiceUrl.NoteUrl}/notes/${this.userId}/${noteId}`)
      .pipe(map((never: never) => never));
  }
}
