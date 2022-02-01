import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { AngularPaginatorModule } from 'angular-paginator';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss']
})
export class DataEditorComponent implements OnInit {

  keys: string[] = Object.keys(new Product);

  productList$: Observable<Product[]> = this.productService.getAll()

  phrase: string = '';

  filterKey: string = '';

  sorterKey: string = '';

  direction: number = -1;
  //direction: boolean = false;

  directionId: number = 1;
  directioncatID: number = 1;
  directionName: number = 1;
  directionDescription: number = 1;
  directionPrice: number = 1;
  directionStock: number = 1;
  directionFeatured: number = -1;
  directionActive: number = -1;

  disabled: boolean = true;

  update:boolean = true

  currentPage = 1;
  itemsPerPage: number = 10;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void { }

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
      product => this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/', 'admin'])}
      )
    )
  }

  onItemPerPage(number: number) {
    this.itemsPerPage = number
  }

  onColumnSelect(key: string): void {
    this.sorterKey = key;
    if (this.sorterKey == 'id') {
      if (this.directionId === 1) {
        this.direction = this.directionId
        this.directionId = this.directionId*-1;
      }
      else if (this.directionId === -1) {
        this.direction = this.directionId
        this.directionId = this.directionId*-1;
      }
    }
    if (this.sorterKey == 'catID') {
      if (this.directioncatID === 1) {
        this.direction = this.directioncatID
        this.directioncatID = this.directioncatID*-1;
      }
      else if (this.directioncatID === -1) {
        this.direction = this.directioncatID
        this.directioncatID = this.directioncatID*-1;
      }
    }
    if (this.sorterKey == 'name') {
      if (this.directionName === 1) {
        this.direction = this.directionName
        this.directionName = this.directionName*-1;
      }
      else if (this.directionName === -1) {
        this.direction = this.directionName
        this.directionName = this.directionName*-1;
      }
    }
    if (this.sorterKey == 'description') {
      if (this.directionDescription === 1) {
        this.direction = this.directionDescription
        this.directionDescription = this.directionDescription*-1;
      }
      else if (this.directionDescription === -1) {
        this.direction = this.directionDescription
        this.directionDescription = this.directionDescription*-1;
      }
    }
    if (this.sorterKey == 'price') {
      if (this.directionPrice === 1) {
        this.direction = this.directionPrice
        this.directionPrice = this.directionPrice*-1;
      }
      else if (this.directionPrice === -1) {
        this.direction = this.directionPrice
        this.directionPrice = this.directionPrice*-1;
      }
    }
    if (this.sorterKey == 'stock') {
      if (this.directionStock === 1) {
        this.direction = this.directionStock
        this.directionStock = this.directionStock*-1;
      }
      else if (this.directionStock === -1) {
        this.direction = this.directionStock
        this.directionStock = this.directionStock*-1;
      }
    }
    if (this.sorterKey == 'featured') {
      if (this.directionFeatured === 1) {
        this.direction = this.directionFeatured
        this.directionFeatured = this.directionFeatured*-1;
      }
      else if (this.directionFeatured === -1) {
        this.direction = this.directionFeatured
        this.directionFeatured = this.directionFeatured*-1;
      }
    }
    if (this.sorterKey == 'active') {
      if (this.directionActive === 1) {
        this.direction = this.directionActive
        this.directionActive = this.directionActive*-1;
      }
      else if (this.directionActive === -1) {
        this.direction = this.directionActive
        this.directionActive = this.directionActive*-1;
      }
    }
  }


}
