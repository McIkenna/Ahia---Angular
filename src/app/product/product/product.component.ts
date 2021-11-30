import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  product: Product[] = [];
  
  constructor(private productService: ProductService, private route : Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.productService.getAllProducts().subscribe(data => {this.product = data})
  }

  selectProduct(id: any){
    this.route.navigate(['/product', id]).then();
  }

 
}
