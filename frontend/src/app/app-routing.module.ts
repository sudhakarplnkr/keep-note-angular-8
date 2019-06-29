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
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  }, {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(mod => mod.RegistrationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(mod => mod.CategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then(mod => mod.NotesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then(mod => mod.RemindersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then(mod => mod.LogoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
