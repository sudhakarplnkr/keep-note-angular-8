import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CategoryCreateComponent } from './categories/category-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReminderCreateComponent } from './reminders/reminder-create.component';
import { NotesCreateComponent } from './notes/notes-create.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { SearchComponent } from './core/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    CategoryCreateComponent,
    ReminderCreateComponent,
    NotesCreateComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthInterceptor,
    Title
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryCreateComponent,
    ReminderCreateComponent,
    NotesCreateComponent
  ],
  exports: [
    SearchComponent,
  ]
})
export class AppModule { }
