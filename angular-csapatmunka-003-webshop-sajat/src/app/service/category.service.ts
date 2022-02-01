import { Category } from 'src/app/model/category';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  jsonUrl: string = environment.jsonUrl
  entityName: string = 'category'

  constructor(private http: HttpClient) { }

  getAll() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.jsonUrl}${this.entityName}`);
  }

  getOne(id: string | number) : Observable<Category> {
    return this.http.get<Category>(`${this.jsonUrl}${this.entityName}/${id}`);
  }

  update(category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.jsonUrl}${this.entityName}/${category.id}`, category)
  }

  create(category: Category): Observable<Category> {
    category.disabled = true
    return this.http.post<Category>(`${this.jsonUrl}${this.entityName}`, category);
  }

  remove(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.jsonUrl}${this.entityName}/${id}`)
  }
}
