import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

    private readonly products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    inStock: true
  },
  {
    id: 2,
    name: "Phone",
    price: 800,
    category: "Electronics",
    inStock: true
  },
  {
    id: 3,
    name: "Headphones",
    price: 100,
    category: "Accessories",
    inStock: false
  },
  {
    id: 4,
    name: "Keyboard",
    price: 50,
    category: "Accessories",
    inStock: true
  }
];

getProducts(): any[] {
  return this.products.length > 0 ? this.products : [];
}

getProductById(id: number): any {

  return this.products.find(product => product.id === id) || "Product not found";
}

}