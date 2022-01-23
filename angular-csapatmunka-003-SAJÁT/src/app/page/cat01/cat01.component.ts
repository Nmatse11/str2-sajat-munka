import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cat01',
  templateUrl: './cat01.component.html',
  styleUrls: ['./cat01.component.scss']
})
export class Cat01Component implements OnInit {

  featuredCat1List: Product[] = []
  cat1List: Product[] = []

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      product => this.featuredCat1List = Object.values(product).filter(item => item.catID == "LegoDuplo").filter(item => item.featured == true).sort((a, b) => 0.5 - Math.random()).slice(0, 5),
    )

    this.productService.getAll().subscribe(
      product => this.cat1List = Object.values(product).filter(item => item.catID == "LegoDuplo"),
    )
  }

}
