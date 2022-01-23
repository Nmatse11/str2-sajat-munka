import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() categoryProducts: Product[] = []

  keys: string[] = Object.keys(new Product()).filter(item => item == "name" || item == "price" || item == "stock" || item == "featured" || item == "active" || item =="discount" );

  phrase: string = '';

  filterKey: string = '';

  sorterKey: string = '';

  backSorterKey: string = '';

  constructor(
    ) { }

    ngOnInit(): void {

    }

    onSorterSelect(key: string): void {
      this.sorterKey = key;
    }

    onBackSorterSelect(key: string): void {
      this.backSorterKey = key;
    }
}
