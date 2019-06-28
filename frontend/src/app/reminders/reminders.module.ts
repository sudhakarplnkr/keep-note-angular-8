import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersComponent } from './reminders.component';
import { ReminderCreateComponent } from './reminder-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReminderService } from './reminder.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    RemindersComponent,
    ReminderCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ReminderCreateComponent
  ],
  providers: [
    ReminderService,
    AuthService
  ]
})
export class RemindersModule { }
