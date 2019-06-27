import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from './category';
import { CategoryService } from './category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent implements OnInit {

    message: string;
    submitted: boolean = false;
    categoryForm: FormGroup;

    @Input() category: Category;

    constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            name: [null, Validators.required],
            description: [null, Validators.required]
        });
        this.setDefault();
        this.categoryForm.valueChanges.subscribe(category => {
            this.category = { ...this.category, ...category };
        });
    }

    save(): void {
        this.submitted = true;
        if (this.categoryForm.invalid) {
            return;
        }
        this.categoryService.save(this.category).subscribe(() => {
            this.activeModal.close('saved');
        }, (error: any) => { this.message = error.error; });
    }

    private setDefault(): void {
        if (this.category) {
            const { name, description } = this.category;
            this.categoryForm.setValue({ name, description });
        }
    }

}
