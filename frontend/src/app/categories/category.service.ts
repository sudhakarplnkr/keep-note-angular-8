import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient, authService: AuthService) {
    super(authService);
  }

  get(): Observable<Category[]> {
    return this.http.get(`${ServiceUrl.CategoryUrl}/categories/${this.userId}`)
      .pipe(map((cat: Category[]) => cat));
  }

  save(category: Category): Observable<void> {
    if (category.id) {
      return this.http.put(`${ServiceUrl.CategoryUrl}/category/${category.id}`, category)
        .pipe(map((never: never) => never));
    }
    category.createdBy = this.userId;
    return this.http.post(`${ServiceUrl.CategoryUrl}/category`, category)
      .pipe(map((never: never) => never));
  }

  delete(categoryId: number): Observable<void> {
    return this.http.delete(`${ServiceUrl.CategoryUrl}/category/${categoryId}`)
      .pipe(map((never: never) => never));
  }
}
