import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from './model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minden, ami LEGO';

  constructor( ) { }
}
