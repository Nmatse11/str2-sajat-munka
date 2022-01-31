import { Category } from 'src/app/model/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryList: Category[] = [{
    id: 1,
    name: "LEGO DUPLO",
    description: "Már 50 éve jelennek meg a nagy álmokat szövögető kis alkotóknak szánt újabb és újabb DUPLO készletek. Az építőtömböket és -készleteket arra terveztük, hogy játékos tanulás útján járuljanak hozzá a gyermekek fejlődéséhez. Válogass termékeink közül a legkisebbeknek!",
    disabled: true
  }, {
    id: 2,
    name: "LEGO",
    description: "Fejleszd gyermeked kreativitását a LEGO készletekkel! Fedezd fel kedvező ajánlatainkat, válogass széles termékkínálatunkból!",
    disabled: true
  }]

  constructor() { }

  getAll(): Category[] {
    return this.categoryList;
  }

  getOne(id: number): Category {
    return this.categoryList.filter(category => category.id === id)[0];
  }

 create(category: Category): void {
   category.id = this.categoryList.length+1
   category.disabled = true
    this.categoryList.push(category);
  }
}
