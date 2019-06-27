import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reminder } from './reminder';
import { ReminderService } from './reminder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-reminders-create',
    templateUrl: './reminder-create.component.html'
})
export class ReminderCreateComponent implements OnInit {

    message: string;
    submitted: boolean = false;
    reminderForm: FormGroup;

    @Input() reminder: Reminder;

    constructor(private formBuilder: FormBuilder, private reminderService: ReminderService, public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        this.reminderForm = this.formBuilder.group({
            name: [null, Validators.required],
            description: [null, Validators.required],
            type: [null, Validators.required]
        });
        this.setDefault();
        this.reminderForm.valueChanges.subscribe(reminder => {
            this.reminder = { ...this.reminder, ...reminder };
        });
    }

    save(): void {
        this.submitted = true;
        if (this.reminderForm.invalid) {
            return;
        }
        this.reminderService.save(this.reminder).subscribe(() => {
            this.activeModal.close('saved');
        }, (error: any) => { this.message = error.error; });
    }

    private setDefault(): void {
        if (this.reminder) {
            const { name, description, type } = this.reminder;
            this.reminderForm.setValue({ name, description, type });
        }
    }

}
