import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessengerService } from 'src/app/product/messenger.service';
import { Product } from 'src/app/product/product';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  faCartPlus = faCartPlus;
  cartItems : any[]=[];
  constructor(private _msgService: MessengerService,
    private _cartSvc : CartService, private router : Router) { 
     
    }
 
  cartTotal = 0;
  totalQuantity = 0;
  
  ngOnInit(): void {
   //this.handleSub();
   this.loadCartItems();
}


// handleSub(){
//   this._msgService.getMsg().subscribe((product: any) => {
    
//    this.loadCartItems();
//   })
// }

loadCartItems(){
  this._cartSvc.getCartItems().subscribe((items: CartItem[])=>{
   for(let item of items){

    let productExist = false;
    for(let i in this.cartItems){
        if (this.cartItems[i].productId === item.id){
             productExist = true;
             break;
          }
        }
    if(!productExist){ 
    this.cartItems.push({
      productId: item.id,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price
  })
   }
   
}
this.calcCartTotal();
})
}

// additemToCart(product: Product){
//   let productExist = false;
//   if(product.id != ""){
//   for(let i in this.cartItems){
//           if (this.cartItems[i].productId === product.id){
//              this.cartItems[i].quantity++;
//              productExist = true;
//              break;
//           }
//         }

//   if(!productExist){
//       this.cartItems.push({
//         productId: product.id,
//         productName: product.productName,
//         quantity: 1,
//         price: product.price
//     })
//   }
// }

// this.calcCartTotal();

// }

calcCartTotal(){
  this.cartTotal = 0
  this.cartItems.forEach(item => {
    this.cartTotal += (item.quantity * item.price)
    this.totalQuantity += item.quantity;
  })  
}

}
