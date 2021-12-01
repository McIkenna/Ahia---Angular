import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  _product : Product = new Product();
  
  constructor(private productService: ProductService, private route : Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    //Get commonn item based on Id
    const isPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isPresent){
      const id:string = this._activatedRoute.snapshot.paramMap.get('id') || "";
      this.getProductsByCategory(id);
    }
    else{
      this.getProducts();
    }
  }

  private getProducts(){
    this.productService.getAllProducts().subscribe(data => {this.product = data})
  }

  selectProduct(id: any){
    this.route.navigate(['/product', id]).then();
  }

  private getProductsByCategory(id: string){
    this.productService.getProductFromCategory(id).subscribe(data => {this.product = data}) 
  } 

  deleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts()
    })
  }
  
}
