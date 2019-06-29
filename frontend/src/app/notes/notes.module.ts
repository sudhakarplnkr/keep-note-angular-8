import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesCreateComponent } from './notes-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
  { path: '', component: NotesComponent }
];

@NgModule({
  declarations: [
    NotesComponent,
    NotesCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers),
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    NotesCreateComponent
  ]
})
export class NotesModule { }
