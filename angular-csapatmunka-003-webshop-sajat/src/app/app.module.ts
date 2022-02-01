import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularPaginatorModule } from 'angular-paginator'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Cat01Component } from './page/cat01/cat01.component';
import { Cat02Component } from './page/cat02/cat02.component';
import { HomeComponent } from './page/home/home.component';
import { ProductCardComponent } from './common/product-card/product-card.component';
import { ProductPagerComponent } from './common/product-pager/product-pager.component';
import { ProductListComponent } from './common/product-list/product-list.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { ProductComponent } from './page/product/product.component';
import { ProductPageComponent } from './common/product-page/product-page.component';
import { AdminComponent } from './page/admin/admin.component';
import { DataEditorComponent } from './common/data-editor/data-editor.component';
import { NewProductComponent } from './common/new-product/new-product.component';
import { AddNewProductComponent } from './page/add-new-product/add-new-product.component';
import { ViewProductComponent } from './common/view-product/view-product.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { EditCategoryComponent } from './page/edit-category/edit-category.component';
import { CategoryEditorComponent } from './common/category-editor/category-editor.component';
import { NewCategoryComponent } from './common/new-category/new-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    Cat01Component,
    Cat02Component,
    HomeComponent,
    ProductCardComponent,
    ProductPagerComponent,
    ProductListComponent,
    FilterPipe,
    SorterPipe,
    ProductComponent,
    ProductPageComponent,
    AdminComponent,
    DataEditorComponent,
    NewProductComponent,
    AddNewProductComponent,
    ViewProductComponent,
    EditProductComponent,
    EditCategoryComponent,
    CategoryEditorComponent,
    NewCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
