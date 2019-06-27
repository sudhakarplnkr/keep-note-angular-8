import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoryCreateComponent } from './category-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './category.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CategoryCreateComponent
  ],
  providers: [
    CategoryService,
    AuthService
  ]
})
export class CategoriesModule { }
