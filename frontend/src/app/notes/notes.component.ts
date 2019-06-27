import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Note } from './note';
import { NotesCreateComponent } from './notes-create.component';
import { NoteService } from './note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  constructor(private modalService: NgbModal, private noteService: NoteService, private ngbModalConfig: NgbModalConfig) {
      this.ngbModalConfig.backdrop = 'static';
  }

  ngOnInit() {
    this.get();
  }

  create(note?: Note) {
    const modal = this.modalService.open(NotesCreateComponent);
    modal.componentInstance.note = note;
    modal.result.then((result) => {
      if (result === 'saved') {
        this.get();
      }
      modal.dismiss();
    }, (reason) => {
    });
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
