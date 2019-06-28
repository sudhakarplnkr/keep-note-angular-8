import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryCreateComponent } from './category-create.component';
import { CategoryService } from './category.service';
import { ModalService } from '../services/modal.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  constructor(
    private categoryService: CategoryService,
    private modalService: ModalService,
    private title: Title) {
    this.title.setTitle('Keep Note - Category');
  }

  ngOnInit() {
    this.get();
  }

  create(category?: Category) {
    this.modalService.openModalDialog(CategoryCreateComponent, category, () => this.get());
  }

  get() {
    this.categoryService.get().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  delete(categoryId: number) {
    this.categoryService.delete(categoryId).subscribe(() => {
      this.get();
    });
  }
}
