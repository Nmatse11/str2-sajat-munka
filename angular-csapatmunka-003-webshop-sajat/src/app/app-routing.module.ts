import { EditCategoryComponent } from './page/edit-category/edit-category.component';
import { ViewProductComponent } from './common/view-product/view-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { Cat01Component } from './page/cat01/cat01.component';
import { Cat02Component } from './page/cat02/cat02.component';
import { HomeComponent } from './page/home/home.component';
import { NewProductComponent } from './common/new-product/new-product.component';
import { ProductComponent } from './page/product/product.component';
import { AddNewProductComponent } from './page/add-new-product/add-new-product.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'legoduplo',
    component: Cat01Component,
  },
  {
    path: 'lego',
    component: Cat02Component,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'newProduct',
    component: AddNewProductComponent,
  },
  {
    path: 'viewProduct/:id',
    component: EditProductComponent,
  },
  {
    path: 'editCategory',
    component: EditCategoryComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
