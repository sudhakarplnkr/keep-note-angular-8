import { Component, OnInit } from '@angular/core';
import { Reminder } from './reminder';
import { ReminderCreateComponent } from './reminder-create.component';
import { ReminderService } from './reminder.service';
import { ModalService } from '../services/modal.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  reminders: Reminder[];
  constructor(
    public modalService: ModalService,
    private reminderService: ReminderService,
    private title: Title) {
    this.title.setTitle('Keep Note - Reminder');
  }

  ngOnInit() {
    this.get();
  }

  create(reminder?: Reminder) {
    this.modalService.openModalDialog(ReminderCreateComponent, reminder, this.get());
  }

  get() {
    this.reminderService.get().subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
    });
  }

  delete(reminderId: number) {
    this.reminderService.delete(reminderId).subscribe(() => {
      this.get();
    });
  }
}
