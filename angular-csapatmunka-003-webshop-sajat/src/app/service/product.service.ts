import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  jsonUrl: string = environment.jsonUrl
  entityName: string = 'product'


  constructor(private http: HttpClient) { }

  getAll() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.jsonUrl}${this.entityName}`);
  }

  getOne(id: string | number) : Observable<Product> {
    return this.http.get<Product>(`${this.jsonUrl}${this.entityName}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.jsonUrl}${this.entityName}/${product.id}`, product)
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.jsonUrl}${this.entityName}`, product);
  }

  remove(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.jsonUrl}${this.entityName}/${id}`)
  }


}
