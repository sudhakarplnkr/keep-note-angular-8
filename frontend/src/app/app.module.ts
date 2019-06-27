import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RegistrationModule } from './registration/registration.module';
import { CategoriesModule } from './categories/categories.module';
import { NotesModule } from './notes/notes.module';
import { RemindersModule } from './reminders/reminders.module';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    LogoutModule,
    RegistrationModule,
    CategoriesModule,
    NotesModule,
    RemindersModule,
    NgbModule.forRoot()
  ],
  providers: [
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
