import { Category } from '../categories/category';
import { Reminder } from '../reminders/reminder';

export class Note {
    public id?: number;
    public title?: string;
    public content?: string;
    public createdBy?: string;
    public creationDate?: Date;
    public category?: Category;
    public reminders?: Reminder[];
}
