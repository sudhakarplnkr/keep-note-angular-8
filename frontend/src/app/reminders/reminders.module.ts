import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersComponent } from './reminders.component';
import { ReminderCreateComponent } from './reminder-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
  { path: '', component: RemindersComponent }
];

@NgModule({
  declarations: [
    RemindersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ]
})
export class RemindersModule { }
