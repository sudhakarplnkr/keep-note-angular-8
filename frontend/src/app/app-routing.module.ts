import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { RemindersComponent } from './reminders/reminders.component';
import { NotesComponent } from './notes/notes.component';
import { CategoriesComponent } from './categories/categories.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  }, {
    path: 'registration',
    component: RegistrationComponent,
    data: {
      title: 'Registration Page'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      title: 'Categories Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'notes',
    component: NotesComponent,
    data: {
      title: 'Notes Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'reminders',
    component: RemindersComponent,
    data: {
      title: 'Reminders Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
