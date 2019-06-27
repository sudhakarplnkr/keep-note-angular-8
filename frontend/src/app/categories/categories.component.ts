import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryCreateComponent } from './category-create.component';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  constructor(
    public modalService: NgbModal,
    private categoryService: CategoryService,
    private ngbModalConfig: NgbModalConfig) {
    this.ngbModalConfig.backdrop = 'static';
  }

  ngOnInit() {
    this.get();
  }

  create(category?: Category) {
    const modal = this.modalService.open(CategoryCreateComponent);
    modal.componentInstance.category = category;
    modal.result.then((result) => {
      if (result === 'saved') {
        this.get();
      }
      modal.dismiss();
    }, (reason) => {
    });
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
