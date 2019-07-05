import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { CategoryService } from './category.service';
import { ModalService } from '../services/modal.service';
import { Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Category } from './category';


describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryServiceSpy;

  beforeEach(async(() => {
    const titleSpy = jasmine.createSpyObj('Title', { setTitle: new Observable<never>() });
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', {
      get: of([{ name: 'test', description: 'test desc' }, { name: 'test 1', description: 'test desc 1' }]),
      delete: of()
    });
    const modalServiceSpy = jasmine.createSpyObj('ModalService', { openModalDialog: new Observable<never>() });

    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        { provide: Title, useValue: titleSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('category component should create without crash', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('category component - load all category', () => {
    // Act
    component.get();

    // Assert
    expect(component.categories.length).toBeGreaterThan(0);
    expect(categoryServiceSpy.get).toHaveBeenCalled();
  });

  it('category component - delete existing category', () => {
    // Assert
    const categoryId = 1234;

    // Act
    component.delete(categoryId);

    // Assert
    expect(categoryServiceSpy.get).toHaveBeenCalled();
  });

  it('category component - create category', () => {
    // Assert
    const category: Category = {
      name: 'test category',
      description: 'test description'
    };

    // Act
    component.create(category);

    // Assert
    expect(categoryServiceSpy.get).toHaveBeenCalled();
  });

  it('category component - create category', () => {
    // Act
    component.create();

    // Assert
    expect(categoryServiceSpy.get).toHaveBeenCalled();
  });

});
