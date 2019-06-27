import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesCreateComponent } from './notes-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteService } from './note.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    NotesComponent,
    NotesCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    NotesCreateComponent
  ],
  providers:[
    NoteService
  ]
})
export class NotesModule { }
