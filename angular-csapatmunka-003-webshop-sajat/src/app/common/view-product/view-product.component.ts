import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => this.productService.getOne(params['id']))
  )

  //      <form *ngIf="product.disabled == false" (ngSubmit)="onSaveProduct(productFrom.value)" #productFrom="ngForm">

  disabled: boolean = true;

  update:boolean = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdateProduct(product: Product): void {
    product.disabled = false,
    this.update = false
  }

  onSaveProduct(product: Product): void {
    product.disabled = true,
    this.update = true
    this.productService.update(product).subscribe(
      product => this.router.navigate(['/', 'admin']),
      err => console.error(err)
    )
  }

  onDeleteProduct(product: Product): void {
    product.disabled = true,
    this.update = true
    this.productService.remove(product.id).subscribe(
      product => this.router.navigate(['/', 'admin']),
      err => console.error(err)
    )
}

}
