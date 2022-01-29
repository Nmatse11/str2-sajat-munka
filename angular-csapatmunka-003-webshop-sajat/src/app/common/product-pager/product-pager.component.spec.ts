import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPagerComponent } from './product-pager.component';

describe('ProductPagerComponent', () => {
  let component: ProductPagerComponent;
  let fixture: ComponentFixture<ProductPagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
