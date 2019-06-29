import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoryCreateComponent } from './category-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ],
  entryComponents: [
    CategoryCreateComponent
  ]
})
export class CategoriesModule { }
