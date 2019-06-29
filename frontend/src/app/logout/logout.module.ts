import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
  { path: '', component: LogoutComponent }
];

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ]
})
export class LogoutModule { }
