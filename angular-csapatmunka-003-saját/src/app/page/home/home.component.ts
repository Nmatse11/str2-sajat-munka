import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredList: Product[] = []
  discountList: Product[] = []

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      product => this.featuredList = Object.values(product).filter(item => item.featured == true).sort((a, b) => 0.5 - Math.random()).slice(0, 5),
    )

    this.productService.getAll().subscribe(
      product => this.discountList = Object.values(product).filter(item => item.stock <= 5).sort((a, b) => 0.5 - Math.random()).slice(0, 5),
    )
    console.log(this.featuredList)
  }

}
