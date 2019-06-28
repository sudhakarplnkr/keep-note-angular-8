import { Component, OnInit, Input } from '@angular/core';
import { Note } from './note';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from './note.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../categories/category';
import { Reminder } from '../reminders/reminder';
import { CategoryService } from '../categories/category.service';
import { ReminderService } from '../reminders/reminder.service';

@Component({
    selector: 'app-notes-create',
    templateUrl: './notes-create.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesCreateComponent implements OnInit {
    message: string;
    submitted = false;
    noteForm: FormGroup;
    categories: Category[];
    reminders: Reminder[];
    remindersSettings: any;

    @Input() data: Note;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private reminderService: ReminderService,
        private noteService: NoteService,
        public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        this.noteForm = this.formBuilder.group({
            title: [null, Validators.required],
            content: [null, Validators.required],
            category: [null, Validators.required],
            reminders: [null, Validators.required]
        });
        this.setDefault();
        this.noteForm.valueChanges.subscribe(note => {
            this.data = { ...this.data, ...note };
        });
    }

    save(): void {
        this.submitted = true;
        if (this.noteForm.invalid) {
            return;
        }
        this.noteService.save(this.data).subscribe(() => {
            this.activeModal.close('saved');
        }, (error: any) => { this.message = error.error; });
    }

    private setDefault(): void {
        if (this.data) {
            const { title, content, reminders } = this.data;
            this.noteForm.patchValue({ title, content, reminders });
        }
        this.loadCategories();
        this.loadReminders();
        this.remindersSettings = {
            singleSelection: false,
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: false,
            enableCheckAll: false
        };
    }

    private loadCategories() {
        this.categoryService.get().subscribe((categories: Category[]) => {
            this.categories = categories;
            if (this.data) {
                const { category } = this.data;
                const selectCategory = categories.find(u => u.id === category.id);
                this.noteForm.patchValue({ category: selectCategory });
            }
        });
    }

    private loadReminders() {
        this.reminderService.get().subscribe((reminders: Reminder[]) => this.reminders = reminders);
    }
}
