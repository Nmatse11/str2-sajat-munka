import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  jsonUrl: string = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl);
  }

  getOne(id: string | number) : Observable<Product> {
    return this.http.get<Product>(`${this.jsonUrl}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.jsonUrl}/${product.id}`, product)
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.jsonUrl}`, product);
  }

  remove(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.jsonUrl}/${id}`)
  }



}
