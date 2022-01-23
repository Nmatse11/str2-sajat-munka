import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cat02',
  templateUrl: './cat02.component.html',
  styleUrls: ['./cat02.component.scss']
})
export class Cat02Component implements OnInit {

  featuredCat2List: Product[] = []
  cat2List: Product[] = []

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      product => this.featuredCat2List = Object.values(product).filter(item => item.catID == "Lego").filter(item => item.featured == true).sort((a, b) => 0.5 - Math.random()).slice(0, 5),
    )

    this.productService.getAll().subscribe(
      product => this.cat2List = Object.values(product).filter(item => item.catID == "Lego"),
    )
  }

}
