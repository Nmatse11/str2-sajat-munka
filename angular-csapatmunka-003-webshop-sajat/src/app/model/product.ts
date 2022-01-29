export class Product {
  [key: string]: any;
  id: number = 0;
  catID: string = '';
  name: string = '';
  description: string = '';
  image: string = '';
  price: number = 0;
  stock: number = 0;
  featured: boolean = false;
  active: boolean = true;
  discount: boolean = true;

  /*constructor(id: number, catID: string, name: string, description: string,
    image: string, price: number, stock: number, featured: boolean, active: boolean, discount: boolean) {
      this.id = id;
      this.catID = catID;
      this.name = name;
      this.description = description;
      this.image = image;
      this.price = price;
      this.stock = stock;
      this. featured = featured;
      this.active = active;
      this.discount = discount;
    }*/
}
