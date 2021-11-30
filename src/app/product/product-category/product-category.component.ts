import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;

  filteredProducts: Product[] = [];
  catId:string='';
  constructor(private productService: ProductService, private route : Router) { }

  ngOnInit(): void {
    
  }
  selectProduct(id: any){
    this.route.navigate(['/product', id]).then();
  }



 public getProductByCategory(id: string){
   console.log(id);
     this.productService.getAllProducts().subscribe(data => {this.filteredProducts = data})
    this.route.navigate(['/category', id]).then();
  
  }
}
