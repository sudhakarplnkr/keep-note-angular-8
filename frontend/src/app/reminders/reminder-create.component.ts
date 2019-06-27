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

    @Input() data: Reminder;

    constructor(private formBuilder: FormBuilder, private reminderService: ReminderService, public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        this.reminderForm = this.formBuilder.group({
            name: [null, Validators.required],
            description: [null, Validators.required],
            type: [null, Validators.required]
        });
        this.setDefault();
        this.reminderForm.valueChanges.subscribe(reminder => {
            this.data = { ...this.data, ...reminder };
        });
    }

    save(): void {
        this.submitted = true;
        if (this.reminderForm.invalid) {
            return;
        }
        this.reminderService.save(this.data).subscribe(() => {
            this.activeModal.close('saved');
        }, (error: any) => { this.message = error.error; });
    }

    private setDefault(): void {
        if (this.data) {
            const { name, description, type } = this.data;
            this.reminderForm.setValue({ name, description, type });
        }
    }

}
