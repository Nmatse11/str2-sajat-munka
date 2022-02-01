import { Category } from './../../model/category';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cat02',
  templateUrl: './cat02.component.html',
  styleUrls: ['./cat02.component.scss']
})
export class Cat02Component implements OnInit {

  featuredCat2List: Product[] = []
  cat2List: Product[] = []

  category: Category = new Category()

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      product => this.featuredCat2List = Object.values(product).filter(item => item.catID == "Lego").filter(item => item.featured == true).sort((a, b) => 0.5 - Math.random()).slice(0, 5),
    )

    this.productService.getAll().subscribe(
      product => this.cat2List = Object.values(product).filter(item => item.catID == "Lego"),
    )

    this.categoryService.getOne(2).subscribe(
      category => this.category = category
    )
  }

}
