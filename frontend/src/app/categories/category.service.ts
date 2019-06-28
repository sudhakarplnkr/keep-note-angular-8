import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { Observable } from 'rxjs';
import { ServiceUrl } from '../environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  get(): Observable<Category[]> {
    const { userId } = this.authService.currentUserValue;    
    return this.http.get(`${ServiceUrl.CategoryUrl}/categories/${userId}`).pipe(map((cat: Category[])=> cat));
  }

  save(category: Category): Observable<any> {
    if (category.id) {
      return this.http.put(`${ServiceUrl.CategoryUrl}/category/${category.id}`, category);
    }
    const { userId } = this.authService.currentUserValue;
    category.createdBy = userId;
    return this.http.post(`${ServiceUrl.CategoryUrl}/category`, category);
  }

  delete(categoryId: number): Observable<any> {
    return this.http.delete(`${ServiceUrl.CategoryUrl}/category/${categoryId}`);
  }
}
