import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersComponent } from './reminders.component';
import { Observable, of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ReminderService } from './reminder.service';
import { ModalService } from '../services/modal.service';

describe('RemindersComponent', () => {
  let component: RemindersComponent;
  let fixture: ComponentFixture<RemindersComponent>;
  let reminderServiceSpy;

  beforeEach(async(() => {
    const titleSpy = jasmine.createSpyObj('Title', { setTitle: new Observable<never>() });
    reminderServiceSpy = jasmine.createSpyObj('ReminderService', {
      get: of([{ name: 'test', description: 'test desc' }, { name: 'test 1', description: 'test desc 1' }]),
      delete: of()
    });
    const modalServiceSpy = jasmine.createSpyObj('ModalService', { openModalDialog: new Observable<never>() });

    TestBed.configureTestingModule({
      declarations: [RemindersComponent],
      providers: [
        { provide: Title, useValue: titleSpy },
        { provide: ReminderService, useValue: reminderServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
