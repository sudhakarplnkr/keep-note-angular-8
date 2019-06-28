import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { ModalService } from '../services/modal.service';
import { NotesCreateComponent } from './notes-create.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  constructor(
    private modalService: ModalService,
    private noteService: NoteService,
    private title: Title) {
    this.title.setTitle('Keep Note - Reminder');
  }

  ngOnInit() {
    this.get();
  }

  create(note?: Note) {
    this.modalService.openModalDialog(NotesCreateComponent, note, () => this.get());
  }

  get() {
    this.noteService.get().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  delete(noteId: number) {
    this.noteService.delete(noteId).subscribe(() => {
      this.get();
    });
  }

}
