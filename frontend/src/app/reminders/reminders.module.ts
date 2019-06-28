import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersComponent } from './reminders.component';
import { ReminderCreateComponent } from './reminder-create.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ]
})
export class RemindersModule { }
