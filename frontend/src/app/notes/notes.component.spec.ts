import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { of, Observable } from 'rxjs';
import { NoteService } from './note.service';
import { ModalService } from '../services/modal.service';
import { Title } from '@angular/platform-browser';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let noteServiceSpy;

  beforeEach(async(() => {
    const titleSpy = jasmine.createSpyObj('Title', { setTitle: new Observable<never>() });
    noteServiceSpy = jasmine.createSpyObj('CategoryService', {
      get: of([
        {
          title: 'test', content: 'test desc', category: { name: 'test 1', description: 'test desc 1' },
          createdBy: 'Sudhakar', creationDate: new Date(),
          reminders: [{ name: 'test 1' }]
        },
        {
          title: 'test 1', content: 'test content 2', category: { name: 'test 2', description: 'test desc 2' },
          createdBy: 'Sudhakar', creationDate: new Date(),
          reminders: [{ name: 'test 2' }]
        }]),
      delete: of()
    });
    const modalServiceSpy = jasmine.createSpyObj('ModalService', { openModalDialog: new Observable<never>() });
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      providers: [
        { provide: Title, useValue: titleSpy },
        { provide: NoteService, useValue: noteServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
