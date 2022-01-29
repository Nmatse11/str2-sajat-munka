import { Observable } from 'rxjs';
import { Category } from './../model/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  list: Category[] = [{
    id: 1,
    name: "LEGO DUPLO",
    description: "Már 50 éve jelennek meg a nagy álmokat szövögető kis alkotóknak szánt újabb és újabb DUPLO készletek. Az építőtömböket és -készleteket arra terveztük, hogy játékos tanulás útján járuljanak hozzá a gyermekek fejlődéséhez. Válogass termékeink közül a legkisebbeknek!"
  }, {
    id: 2,
    name: "LEGO",
    description: "Fejleszd gyermeked kreativitását a LEGO készletekkel! Fedezd fel kedvező ajánlatainkat, válogass széles termékkínálatunkból!"
  }]

  constructor() { }

}
