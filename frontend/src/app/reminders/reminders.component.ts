import { Component, OnInit } from '@angular/core';
import { Reminder } from './reminder';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReminderCreateComponent } from './reminder-create.component';
import { ReminderService } from './reminder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  reminders: Reminder[];
  constructor(
    public modalService: NgbModal,
    private reminderService: ReminderService,
    private ngbModalConfig: NgbModalConfig,
    private toastrService: ToastrService) {
    this.ngbModalConfig.backdrop = 'static';
  }

  ngOnInit() {
    this.get();
  }

  create(reminder?: Reminder) {
    const modal = this.modalService.open(ReminderCreateComponent);
    modal.componentInstance.reminder = reminder;
    modal.result.then((result) => {
      if (result === 'saved') {
        this.toastrService.success('Saved successfully.');
        this.get();
      }
      modal.dismiss();
    }, (reason) => {
    });
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
