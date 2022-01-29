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


  /*
  Nem json fájl, hanem lista esetén így is lehetett volna.

  getAll(): Product[] {
    return this.productList;
  }
  getOne(id: string | number): Product {
    return this.productList.filter(product => product.id === Number(id))[0];
  }
  getAllFeaturedByCatId(catId: string | number): Product[] {
    return this.productList.filter(product => product.catId === Number(catId) && product.featured);
  }
  getFeaturedAll(): Product[] {
    return this.productList.filter(product => product.featured)
  }
  getAllbyCatId(catId: string | number): Product[] {
    return this.productList.filter(product => product.catId === Number(catId));
  }
  getCategory(catId: string | number): Category{
    return this.categoryList.filter(category => category.id === Number(catId))[0];
  }
  getRandom(list: Product[], num: number = 5): Product[] {
    num = num > list.length ? list.length : num;
    const copyList = [...list];
    const result: Product[] = [];
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * copyList.length);
      result.push(copyList[index]);
      copyList.splice(index, 1);
    }
    return result;
  }*/

}
