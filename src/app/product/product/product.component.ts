import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MessengerService } from '../messenger.service';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/cart/cart-item';
import { WishlistService } from 'src/app/wishlist/wishlist.service';

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
  addedToWishList : boolean = false;

  
  
  constructor(private productService: ProductService, private route : Router, private _activatedRoute: ActivatedRoute,
    private _msg : MessengerService, private _cartSvc: CartService, private wishlistService : WishlistService) { }

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

  getProducts(){
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

  addToCartHandler(id: string){
    this.productService.getSingleProduct(id).subscribe( data => {
      this._cartSvc.addProductToCart(data).subscribe(() => {})
      //localStorage.setItem('cart-items', JSON.stringify(data))
     //this._msg.sendMsg(data)
      window.location.reload();
      //this.addingCartToLocal(data);
   
    }); 
    }
    // addingCartToLocal(cartItem:any){
    //   let cartItems: any = [];
    //   if(localStorage.getItem('cart-items')){
    //     cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
    //     cartItems = [cartItem, ...cartItems]
    //   }else{
    //     cartItems = [cartItem];
    //   }
    //   localStorage.setItem('cart-items', JSON.stringify(cartItems))
    // }

    addToWishList(id: string){
      console.log(id);
      this.wishlistService.addToWishlist(id).subscribe(() => {
          this.addedToWishList = true;
      })
    }
    removeFromWishList(id: string){
      this.wishlistService.removeFromWishlist(id).subscribe(() => {
        this.addedToWishList = false;
      })
    }
}
